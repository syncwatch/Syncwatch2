import os


def validate_global_settings(settings):
    current_dir = os.path.dirname(os.path.realpath(__file__))

    if 'WEBSERVER_DEBUG' not in settings or not settings['WEBSERVER_DEBUG']:
        settings['WEBSERVER_DEBUG'] = False
    if 'WEBSERVER_STATIC_PATH' not in settings or not isinstance(settings['WEBSERVER_STATIC_PATH'], str):
        settings['WEBSERVER_STATIC_PATH'] = os.path.join(current_dir, 'static')
    if 'WEBSERVER_PORT' not in settings or not isinstance(settings['WEBSERVER_PORT'], int):
        settings['WEBSERVER_PORT'] = 4004
    if 'WEBSERVER_LOGGING_LEVEL' not in settings or not isinstance(settings['WEBSERVER_LOGGING_LEVEL'], int):
        settings['WEBSERVER_LOGGING_LEVEL'] = 30
    return settings
