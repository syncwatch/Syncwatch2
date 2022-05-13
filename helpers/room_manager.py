from helpers.crypt import TokenGenerator
from helpers.exceptions import CreatingExistingRoomException, RoomNotFoundException


class Room:
    def __init__(self, creator_session):
        self.members = [creator_session]

    def join(self, session):
        self.members.append(session)

    def leave(self, session):
        self.members.remove(session)


class RoomManager:
    def __init__(self, room_id_length=6):
        self.rooms = {}
        self.room_id_generator = TokenGenerator(room_id_length)

    async def create_room(self, session) -> Room:
        room_id = self.room_id_generator.generate()
        if room_id in self.rooms:
            raise CreatingExistingRoomException()
        room = Room(session)
        self.rooms[room_id] = room
        return room

    async def join_room(self, room_id, session) -> Room:
        if room_id not in self.rooms:
            raise RoomNotFoundException()
        room = self.rooms[room_id]
        room.join(session)
        return room

    async def leave_room(self, room_id, session):
        if room_id not in self.rooms:
            raise RoomNotFoundException()
        room = self.rooms[room_id]
        room.leave(session)
