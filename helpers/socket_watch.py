from flask_socketio import SocketIO


class SocketWatch:
    def connect(self):
        print('connect')

    def disconnect(self):
        print('disconnect')

    def create_room(self):
        print('create room')

    def __init__(self, io: SocketIO, namespace='/watch'):
        io.on_event('connect', self.connect, namespace=namespace)
        io.on_event('disconnect', self.disconnect, namespace=namespace)
        io.on_event('create-room', self.create_room, namespace=namespace)
