from server import create_server

from settings import GLOBAL_SETTINGS

server = create_server(GLOBAL_SETTINGS)
app = server.app

if __name__ == '__main__':
    server.run()
