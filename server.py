import asyncio
import logging
import os
import threading

import werkzeug
from flask import Flask, jsonify, send_from_directory, redirect, request
from flask.logging import default_handler
from gevent.pywsgi import WSGIServer


class Page:
    def __init__(self, path, get_func=None, post_func=None):
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


class WebServer(threading.Thread):
    async def auth(self):
        return jsonify({
            'msg': 'success'
        }), 200

    def __init__(self,
                 name='Webserver',
                 host='0.0.0.0',
                 port=4004,
                 static_path=None,
                 debug=False,
                 logging_level=logging.WARNING,
                 api_base='/fap'
                 ):
        super().__init__()

        self.HOST = host
        self.PORT = port

        self.root_path = os.path.dirname(os.path.abspath(__file__))
        self.static_path = os.path.join(self.root_path, static_path)
        self.app = Flask(
            name,
            root_path=self.root_path,
        )
        self.app.debug = debug

        self.app.logger.removeHandler(default_handler)
        self.app.logger.setLevel(logging_level)

        @self.app.errorhandler(Exception)
        def handle_exception(e):
            self.app.log_exception(e)
            if isinstance(e, werkzeug.exceptions.HTTPException):
                return jsonify({
                    'code': e.code,
                    'name': e.name,
                    'description': e.description,
                }), e.code

            return jsonify({
                'code': 400,
                'name': type(e).__name__,
                'description': str(e),
            }), 400

        if debug:
            @self.app.after_request
            def after_request_func(response):
                header = response.headers
                header['Access-Control-Allow-Origin'] = '*'
                header['Access-Control-Allow-Headers'] = '*'
                header['Access-Control-Allow-Methods'] = '*'
                return response

        async def send_root():
            return send_from_directory(self.static_path, 'index.html')

        async def static_file(path):
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
            Page(path=f"{api_base}/auth", post_func=self.auth),
            Page(path='/<path:path>', get_func=static_file),
            Page(path='/', get_func=send_root),
        ]

        for page in pages:
            page.add_to_app(self.app)

    def run(self) -> None:
        http_server = WSGIServer((self.HOST, self.PORT), self.app)
        self.app.logger.info('starting webserver on {}:{}'.format(self.HOST, self.PORT))
        if self.app.debug:
            self.app.logger.warning('app is running in debug mode')
        http_server.serve_forever()


def main():
    from settings import GLOBAL_SETTINGS

    logging.basicConfig()

    ws = WebServer(
        port=GLOBAL_SETTINGS['WEBSERVER_PORT'],
        static_path=GLOBAL_SETTINGS['WEBSERVER_STATIC_PATH'],
        debug=GLOBAL_SETTINGS['WEBSERVER_DEBUG'],
        logging_level=GLOBAL_SETTINGS['WEBSERVER_LOGGING_LEVEL']
    )
    ws.run()


if __name__ == '__main__':
    main()
