import asyncio
import typing

from flask_socketio import SocketIO, join_room, emit

from helpers.crypt import TokenGenerator
from helpers.exceptions import UnauthorizedException

if typing.TYPE_CHECKING:
    from server import WebServer


class SocketWatch:
    async def connect(self):
        try:
            session = await self.server.get_session()
        except UnauthorizedException:
            raise ConnectionRefusedError('authentication failed')
        print('connect', session)

    async def disconnect(self):
        print('disconnect')

    async def create_room(self, movie_id: str):
        room_id = self.room_id_generator.generate()
        print('create room', room_id)
        join_room(room_id)
        emit('join-room', room_id, to=room_id)

    async def seeked(self, time: int):
        print(time, await self.server.get_session())

    def __init__(self, server: 'WebServer', io: SocketIO, room_id_length=6, namespace='/watch'):
        self.room_id_generator = TokenGenerator(room_id_length)
        self.server = server

        def _wrapper(func):
            def _call(*args, **kwargs):
                loop = asyncio.new_event_loop()
                task = loop.create_task(func(*args, **kwargs))
                res = loop.run_until_complete(task)
                return res

            return _call
        io.on_event('connect', _wrapper(self.connect), namespace=namespace)
        io.on_event('disconnect', _wrapper(self.disconnect), namespace=namespace)
        io.on_event('create-room', _wrapper(self.create_room), namespace=namespace)
        io.on_event('seeked', _wrapper(self.seeked), namespace=namespace)
