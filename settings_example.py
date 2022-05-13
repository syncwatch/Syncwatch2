import os
from settings_validator import validate_global_settings

current_dir = os.path.dirname(os.path.realpath(__file__))

GLOBAL_SETTINGS = validate_global_settings({
    'DATABASE_URL': '{protocol}://{hostname}/{path}'.format(protocol='sqlite',
                                                            hostname='',
                                                            path=os.path.join(current_dir, 'database.db')),
    'TOKEN_EXPIRES_DAYS': 7,
    'WEBSERVER_DEBUG': False,
    'WEBSERVER_STATIC_PATH': os.path.join(current_dir, 'static')
})
