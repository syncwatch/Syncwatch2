import logging
import os
import time
from typing import Union

import uvicorn
from fastapi import Body, FastAPI, Header
from sqlalchemy.engine import Row
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, FileResponse, RedirectResponse

from helpers.crypt import HashDealer, TokenGenerator
from helpers.data_manager import DataManager
from helpers.db import Database, DeviceSession, User

from helpers.exceptions import LoginIncorrectException, DuplicateSessionTokenException, SessionUnauthorizedException, \
    SessionExpiredException, NotFoundException
from helpers.json_encoder import CustomJSONResponse
from settings_validator import validate_global_settings

PERMISSIONS = [
    'watcher',
    'uploader',
    'moderator',
    'admin'
]


class Server:
    async def get_session(self, token: str) -> Row[DeviceSession, User]:
        session = self.db.get_device_session(token, int(time.time()))
        if session is None:
            raise SessionExpiredException()
        return session

    def _add_user(self, username: str, password: str, permission: int, premium: bool):
        self.db.add_user(username, self.hash_dealer.hash_password(password), permission, premium)

    def __init__(self,
                 data_manager: DataManager = None,
                 db: Database = None,
                 hash_dealer: HashDealer = HashDealer(),
                 token_generator: TokenGenerator = TokenGenerator(),
                 token_expires_days: Union[int, float] = -1,
                 host: str = '0.0.0.0',
                 port: int = 4004,
                 static_path: str = 'static',
                 debug: bool = False,
                 logging_level: int = logging.WARNING,
                 api_base: str = 'fap'
                 ):
        super().__init__()

        self.db = db
        self.data_manager = data_manager
        self.hash_dealer = hash_dealer
        self.token_generator = token_generator

        self.token_expires_days = token_expires_days

        if self.db is not None and len(self.db.get_users()) == 0:
            self._add_user('admin', 'admin', len(PERMISSIONS) - 1, True)

        self.HOST = host
        self.PORT = port

        self.root_path = os.path.dirname(os.path.abspath(__file__))
        self.static_path = os.path.join(self.root_path, static_path)
        self.app = FastAPI(
            debug=debug,
            openapi_url=None,
            docs_url=None,
            redoc_url=None,
        )

        self.app.logger = logging.getLogger(__name__)

        if self.data_manager is not None:
            self.data_manager.initialize(self.db, self.app.logger)

        if debug:
            self.app.add_middleware(
                CORSMiddleware,
                allow_origins=['*'],
                allow_methods=['*'],
                allow_headers=['*'],
            )

        @self.app.post(f'/{api_base}/login')
        async def login(
                username: str = Body(),
                password: str = Body(),
                user_agent: str = Header(),
        ) -> Response:
            user = self.db.get_user_by_username(username)
            if user is None or not self.hash_dealer.verify_password(str(password), str(user.password_hash)):
                raise LoginIncorrectException()

            while True:
                try:
                    session_token = self.token_generator.generate()
                    if self.token_expires_days < 0:
                        expires = -1
                    else:
                        expires = int(time.time() + (60 * 60 * 24 * self.token_expires_days))
                    self.db.add_device_session(user.id, session_token, expires, '{}'.format(
                        user_agent,
                    ))
                    break
                except DuplicateSessionTokenException:
                    pass

            return CustomJSONResponse({
                'msg': 'success',
                'session_token': session_token,
                'expires': expires
            })

        @self.app.post(f'/{api_base}/auth')
        async def auth(
                authorization: str = Header(),
        ) -> Response:
            await self.get_session(authorization)
            return CustomJSONResponse({
                'msg': 'success'
            })

        @self.app.post(f'/{api_base}/logout')
        async def logout(
                authorization: str = Header(),
        ) -> Response:
            session = await self.get_session(authorization)
            self.db.delete_device_session(session[0].session_token)
            return CustomJSONResponse({
                'msg': 'success'
            })

        @self.app.get(f'/{api_base}/sessions')
        async def get_user_sessions(
                authorization: str = Header(),
        ) -> Response:
            session = await self.get_session(authorization)

            def _map(x: Row[int, str]):
                return {'id': x.id, 'device_info': x.device_info, 'is_current': session[0].id == x.id}

            return CustomJSONResponse({
                'msg': 'success',
                'sessions': list(map(_map, self.db.get_user_sessions(session[0].user_id, int(time.time()))))
            })

        @self.app.post(f'/{api_base}/delete-sessions')
        async def delete_user_sessions(
                session_id: Union[str, None] = Body(default=None, embed=True),
                authorization: str = Header(),
        ) -> Response:
            session = await self.get_session(authorization)
            if session_id is None:
                self.db.delete_user_sessions(session[0].user_id)
            else:
                self.db.delete_user_session(session[0].user_id, int(session_id))
            return CustomJSONResponse({
                'msg': 'success'
            })

        @self.app.get(f'/{api_base}/movie')
        async def movie(
                id: str,
                authorization: str = Header(),
        ) -> Response:
            session = await self.get_session(authorization)
            return CustomJSONResponse({
                'msg': 'success',
                'movie': self.data_manager.movie.get_movie_meta_by_id(id)
            })

        @self.app.get(f'/{api_base}/movies')
        async def movies(
                authorization: str = Header(),
        ) -> Response:
            session = await self.get_session(authorization)
            return CustomJSONResponse({
                'msg': 'success',
                'movies': self.data_manager.movie.get_movies_meta()
            })

        @self.app.get(f'/{api_base}/thumbnail')
        async def thumbnail(
                id: str,
                token: str,
        ) -> Response:
            session = await self.get_session(token)
            return self.data_manager.movie.get_thumbnail(id)

        @self.app.get(f'/{api_base}/stream')
        async def stream(
                id: str,
                token: str,
                range: Union[str, None] = Header(default=None),
        ) -> Response:
            session = await self.get_session(token)
            return self.data_manager.movie.stream_movie(id, range)

        @self.app.get('/', include_in_schema=False)
        async def send_root() -> Response:
            return FileResponse(os.path.join(self.static_path, 'index.html'))

        @self.app.get('/{path:path}', include_in_schema=False)
        async def static_file(path: str) -> Response:
            if path.startswith(api_base):
                raise NotFoundException()
            p = os.path.join(self.static_path, path)
            if os.path.isdir(p):
                if p[-1] != '/':
                    return RedirectResponse(path + '/')
                if os.path.isfile(p + 'index.html'):
                    return FileResponse(os.path.join(self.static_path, path + 'index.html'))
            elif os.path.exists(p):
                return FileResponse(os.path.join(self.static_path, path))
            return await send_root()

    def run(self) -> None:
        uvicorn.run(self.app, host=self.HOST, port=self.PORT)


def create_server(settings):
    settings = validate_global_settings(settings)
    return Server(
        data_manager=DataManager(settings['DATA_PATH']),
        db=Database(settings['DATABASE_URL']),
        hash_dealer=HashDealer(
            kdf_length=settings['HASH_KDF_LENGTH'],
            n_cost_factor=settings['HASH_N_COST_FACTOR'],
            r_block_size=settings['HASH_R_BLOCK_SIZE'],
            p_parallelization=settings['HASH_P_PARALLELIZATION'],
            salt_length=settings['HASH_SALT_LENGTH']
        ),
        token_generator=TokenGenerator(
            token_length=settings['TOKEN_LENGTH']
        ),
        token_expires_days=settings['TOKEN_EXPIRES_DAYS'],
        port=settings['WEBSERVER_PORT'],
        static_path=settings['WEBSERVER_STATIC_PATH'],
        debug=settings['WEBSERVER_DEBUG'],
        logging_level=settings['WEBSERVER_LOGGING_LEVEL'],
        api_base=settings['API_BASE'],
    )
