import os
from typing import Dict


def is_number(value):
    return isinstance(value, float) or isinstance(value, int)


def validate_global_settings(settings: Dict):
    current_dir = os.path.dirname(os.path.realpath(__file__))

    if 'API_BASE' not in settings or not isinstance(settings['API_BASE'], str):
        settings['API_BASE'] = '/fap'
    if 'WEBSERVER_DEBUG' not in settings or not settings['WEBSERVER_DEBUG']:
        settings['WEBSERVER_DEBUG'] = False
    if 'WEBSERVER_STATIC_PATH' not in settings or not isinstance(settings['WEBSERVER_STATIC_PATH'], str):
        settings['WEBSERVER_STATIC_PATH'] = os.path.join(current_dir, 'static')
    if 'WEBSERVER_PORT' not in settings or not isinstance(settings['WEBSERVER_PORT'], int):
        settings['WEBSERVER_PORT'] = 4004
    if 'WEBSERVER_LOGGING_LEVEL' not in settings or not isinstance(settings['WEBSERVER_LOGGING_LEVEL'], int):
        settings['WEBSERVER_LOGGING_LEVEL'] = 30
    if 'TOKEN_LENGTH' not in settings or not isinstance(settings['TOKEN_LENGTH'], int):
        settings['TOKEN_LENGTH'] = 32
    if 'HASH_KDF_LENGTH' not in settings or not isinstance(settings['HASH_KDF_LENGTH'], int):
        settings['HASH_KDF_LENGTH'] = 32
    if 'HASH_N_COST_FACTOR' not in settings or not isinstance(settings['HASH_N_COST_FACTOR'], int):
        settings['HASH_N_COST_FACTOR'] = 14
    if 'HASH_R_BLOCK_SIZE' not in settings or not isinstance(settings['HASH_R_BLOCK_SIZE'], int):
        settings['HASH_R_BLOCK_SIZE'] = 8
    if 'HASH_P_PARALLELIZATION' not in settings or not isinstance(settings['HASH_P_PARALLELIZATION'], int):
        settings['HASH_P_PARALLELIZATION'] = 1
    if 'HASH_SALT_LENGTH' not in settings or not isinstance(settings['HASH_SALT_LENGTH'], int):
        settings['HASH_SALT_LENGTH'] = 16
    if 'TOKEN_EXPIRES_DAYS' not in settings or not is_number(settings['TOKEN_EXPIRES_DAYS']):
        settings['TOKEN_EXPIRES_DAYS'] = -1
    if 'DATA_PATH' not in settings or not isinstance(settings['DATA_PATH'], str):
        settings['DATA_PATH'] = None
    return settings
