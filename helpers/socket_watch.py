import asyncio
import typing

from flask_socketio import SocketIO, join_room, emit

from helpers.exceptions import UnauthorizedException, RoomNotFoundException, CreatingExistingRoomException
from helpers.room_manager import RoomManager

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
        session = await self.server.get_session()
        try:
            room_id = await self.room_manager.create_room(session)
        except CreatingExistingRoomException:
            emit('room-existing-error')
            return
        print('create room', room_id, movie_id)
        join_room(room_id)
        emit('join-room', room_id, to=room_id)

    async def join_room(self, room_id: str, movie_id: str):
        session = await self.server.get_session()
        try:
            room_id = await self.room_manager.join_room(room_id, session)
        except RoomNotFoundException:
            emit('room-not-found-error', room_id, to=room_id)
            return
        print('join room', room_id, movie_id)
        join_room(room_id)
        emit('join-room', room_id, to=room_id)

    async def seeked(self, time: int):
        print(time, await self.server.get_session())

    def __init__(self,
                 server: 'WebServer',
                 io: SocketIO,
                 room_manager: RoomManager = None,
                 namespace='/watch'):

        self.server = server
        if room_manager is None:
            room_manager = RoomManager()
        self.room_manager = room_manager

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
        io.on_event('join-room', _wrapper(self.join_room), namespace=namespace)
        io.on_event('seeked', _wrapper(self.seeked), namespace=namespace)
