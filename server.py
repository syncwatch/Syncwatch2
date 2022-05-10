import asyncio
import logging
import os
import threading
import time
from typing import Any, Union

import werkzeug
from flask import Flask, jsonify, send_from_directory, redirect, request
from flask.logging import default_handler
from flask_socketio import SocketIO
from sqlalchemy.engine import Row

from helpers.crypt import HashDealer, TokenGenerator
from helpers.data_manager import DataManager
from helpers.db import Database, DeviceSession, User
from helpers.socket_watch import SocketWatch

from helpers.exceptions import LoginMissingException, LoginIncorrectException, DuplicateSessionTokenException, \
    SessionUnauthorizedException, SessionExpiredException, MovieIdMissingException, ThumbnailIdMissingException, \
    SubtitleIdMissingException
from helpers.json_encoder import create_json_encoder


class Page:
    def __init__(self, path: str, get_func: Any = None, post_func: Any = None):
        self.path = path
        self.get_func = get_func
        self.post_func = post_func
        self.map = {}
        if self.get_func:
            self.map['GET'] = self.get_func
        if self.post_func:
            self.map['POST'] = self.post_func

    def new(self, path=None, get_func=None, post_func=None):
        if path is None:
            path = self.path
        if get_func is None:
            get_func = self.get_func
        if post_func is None:
            post_func = self.post_func
        return Page(path, get_func, post_func)

    def add_to_app(self, app):
        def _wrapper():
            def _call(*args, **kwargs):
                if self.map:
                    loop = asyncio.new_event_loop()
                    task = loop.create_task(self.map[request.method](*args, **kwargs))
                    res = loop.run_until_complete(task)
                    return res

            return _call

        if self.map:
            app.add_url_rule(rule=self.path,
                             endpoint=self.path,
                             view_func=_wrapper(),
                             methods=self.map.keys())


PERMISSIONS = [
    'watcher',
    'uploader',
    'moderator',
    'admin'
]


class WebServer(threading.Thread):
    async def login(self) -> werkzeug.Response:
        json = request.get_json()
        if 'username' not in json or 'password' not in json:
            raise LoginMissingException()

        user = self.db.get_user_by_username(json['username'])
        if user is None or not self.hash_dealer.verify_password(str(json['password']), str(user.password_hash)):
            raise LoginIncorrectException()

        while True:
            try:
                session_token = self.token_generator.generate()
                if self.token_expires_days < 0:
                    expires = -1
                else:
                    expires = int(time.time() + (60 * 60 * 24 * self.token_expires_days))
                self.db.add_device_session(user.id, session_token, expires, '{} {}'.format(
                    request.user_agent.platform,
                    request.user_agent.browser
                ))
                break
            except DuplicateSessionTokenException:
                pass

        return jsonify({
            'msg': 'success',
            'session_token': session_token,
            'expires': expires
        })

    async def get_session_by_arg(self, session_arg: str = 'token'):
        if session_arg not in request.args:
            raise SessionUnauthorizedException()
        session = self.db.get_device_session(request.args[session_arg], int(time.time()))
        if session is None:
            raise SessionExpiredException()
        return session

    async def get_session(self) -> Row[DeviceSession, User]:
        if 'Authorization' not in request.headers:
            raise SessionUnauthorizedException()
        session = self.db.get_device_session(request.headers['Authorization'], int(time.time()))
        if session is None:
            raise SessionExpiredException()
        return session

    async def auth(self) -> werkzeug.Response:
        await self.get_session()
        return jsonify({
            'msg': 'success'
        })

    async def logout(self) -> werkzeug.Response:
        session = await self.get_session()
        self.db.delete_device_session(session[0].session_token)
        return jsonify({
            'msg': 'success'
        })

    async def get_user_sessions(self) -> werkzeug.Response:
        session = await self.get_session()

        def _map(x: Row[int, str]):
            return {'id': x.id, 'device_info': x.device_info, 'is_current': session[0].id == x.id}

        return jsonify({
            'msg': 'success',
            'sessions': list(map(_map, self.db.get_user_sessions(session[0].user_id, int(time.time()))))
        })

    async def delete_user_sessions(self) -> werkzeug.Response:
        session = await self.get_session()
        json = request.get_json()
        if 'session_id' in json:
            self.db.delete_user_session(session[0].user_id, int(json['session_id']))
        else:
            self.db.delete_user_sessions(session[0].user_id)
        return jsonify({
            'msg': 'success'
        })

    async def movies(self) -> werkzeug.Response:
        session = await self.get_session()
        return jsonify({
            'msg': 'success',
            'movies': self.data_manager.movie.get_movies_meta()
        })

    async def movie(self) -> werkzeug.Response:
        session = await self.get_session()
        if 'id' not in request.args:
            raise MovieIdMissingException()
        return jsonify({
            'msg': 'success',
            'movie': self.data_manager.movie.get_movie_meta_by_id(request.args['id'])
        })

    async def stream(self) -> werkzeug.Response:
        session = await self.get_session_by_arg()
        if 'id' not in request.args:
            raise MovieIdMissingException()
        return self.data_manager.movie.stream_movie(request.args['id'])

    async def thumbnail(self):
        session = await self.get_session_by_arg()
        if 'id' not in request.args:
            raise ThumbnailIdMissingException()
        return self.data_manager.movie.get_thumbnail(request.args['id'])

    async def subtitle(self):
        session = await self.get_session_by_arg()
        if 'id' not in request.args:
            raise SubtitleIdMissingException()
        return self.data_manager.movie.get_subtitle(request.args['id'])

    def _add_user(self, username: str, password: str, permission: int, premium: bool):
        self.db.add_user(username, self.hash_dealer.hash_password(password), permission, premium)

    def __init__(self,
                 data_path: str = None,
                 db: Database = None,
                 hash_dealer: HashDealer = HashDealer(),
                 token_generator: TokenGenerator = TokenGenerator(),
                 token_expires_days: Union[int, float] = -1,
                 name: str = 'Webserver',
                 host: str = '0.0.0.0',
                 port: int = 4004,
                 static_path: str = None,
                 debug: bool = False,
                 logging_level: int = logging.WARNING,
                 api_base: str = '/fap'
                 ):
        super().__init__()

        self.db = db
        self.data_manager = DataManager(data_path)
        self.hash_dealer = hash_dealer
        self.token_generator = token_generator

        self.token_expires_days = token_expires_days

        if len(db.get_users()) == 0:
            self._add_user('admin', 'admin', len(PERMISSIONS) - 1, True)

        self.HOST = host
        self.PORT = port

        self.root_path = os.path.dirname(os.path.abspath(__file__))
        self.static_path = os.path.join(self.root_path, static_path)
        self.app = Flask(
            name,
            root_path=self.root_path,
        )
        self.io = SocketIO(self.app)
        SocketWatch(self, self.io)

        self.app.json_encoder = create_json_encoder()

        self.app.debug = debug

        self.app.logger.removeHandler(default_handler)
        self.app.logger.setLevel(logging_level)

        self.data_manager.initialize(self.db, self.app.logger)

        @self.app.errorhandler(Exception)
        def handle_exception(e: Exception) -> werkzeug.Response:
            self.app.log_exception(e)
            if isinstance(e, werkzeug.exceptions.HTTPException):
                res = jsonify({
                    'code': e.code,
                    'name': e.name,
                    'description': e.description,
                })
                res.status_code = e.code
                return res
            res = jsonify({
                'code': 400,
                'name': type(e).__name__,
                'description': str(e),
            })
            res.status_code = 400
            return res

        if debug:
            @self.app.after_request
            def after_request_func(response: werkzeug.Response) -> werkzeug.Response:
                header = response.headers
                header['Access-Control-Allow-Origin'] = '*'
                header['Access-Control-Allow-Headers'] = '*'
                header['Access-Control-Allow-Methods'] = '*'
                return response

        async def send_root() -> werkzeug.Response:
            return send_from_directory(self.static_path, 'index.html')

        async def static_file(path: str) -> werkzeug.Response:
            p = os.path.join(self.static_path, path)
            if os.path.isdir(p):
                if p[-1] != '/':
                    return redirect(path + '/')
                if os.path.isfile(p + 'index.html'):
                    return send_from_directory(self.static_path, path + 'index.html')
            elif os.path.exists(p):
                return send_from_directory(self.static_path, path)
            return await send_root()

        pages = [
            Page(path=f"{api_base}/login", post_func=self.login),
            Page(path=f"{api_base}/auth", post_func=self.auth),
            Page(path=f"{api_base}/logout", post_func=self.logout),
            Page(path=f"{api_base}/sessions", get_func=self.get_user_sessions),
            Page(path=f"{api_base}/delete-sessions", post_func=self.delete_user_sessions),
            Page(path=f"{api_base}/movie", get_func=self.movie),
            Page(path=f"{api_base}/movies", get_func=self.movies),
            Page(path=f"{api_base}/thumbnail", get_func=self.thumbnail),
            Page(path=f"{api_base}/subtitle", get_func=self.subtitle),
            Page(path=f"{api_base}/stream", get_func=self.stream),
            Page(path='/<path:path>', get_func=static_file),
            Page(path='/', get_func=send_root),
        ]

        for page in pages:
            page.add_to_app(self.app)

    def run(self) -> None:
        self.app.logger.info('starting webserver on {}:{}'.format(self.HOST, self.PORT))
        if self.app.debug:
            self.app.logger.warning('app is running in debug mode')
        self.io.run(self.app, host=self.HOST, port=self.PORT)


def main():
    from settings import GLOBAL_SETTINGS

    logging.basicConfig()

    ws = WebServer(
        data_path=GLOBAL_SETTINGS['DATA_PATH'],
        db=Database(GLOBAL_SETTINGS['DATABASE_URL']),
        hash_dealer=HashDealer(
            kdf_length=GLOBAL_SETTINGS['HASH_KDF_LENGTH'],
            n_cost_factor=GLOBAL_SETTINGS['HASH_N_COST_FACTOR'],
            r_block_size=GLOBAL_SETTINGS['HASH_R_BLOCK_SIZE'],
            p_parallelization=GLOBAL_SETTINGS['HASH_P_PARALLELIZATION'],
            salt_length=GLOBAL_SETTINGS['HASH_SALT_LENGTH']
        ),
        token_generator=TokenGenerator(
            token_length=GLOBAL_SETTINGS['TOKEN_LENGTH']
        ),
        token_expires_days=GLOBAL_SETTINGS['TOKEN_EXPIRES_DAYS'],
        port=GLOBAL_SETTINGS['WEBSERVER_PORT'],
        static_path=GLOBAL_SETTINGS['WEBSERVER_STATIC_PATH'],
        debug=GLOBAL_SETTINGS['WEBSERVER_DEBUG'],
        logging_level=GLOBAL_SETTINGS['WEBSERVER_LOGGING_LEVEL'],
        api_base=GLOBAL_SETTINGS['API_BASE'],
    )
    ws.run()


if __name__ == '__main__':
    main()
