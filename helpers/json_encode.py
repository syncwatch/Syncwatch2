from datetime import datetime

from flask.json import JSONEncoder
from sqlalchemy.engine import Row

from helpers.db import Representable


def create_json_encoder():
    class CustomJSONEncoder(JSONEncoder):
        def default(self, o):
            if isinstance(o, datetime):
                return datetime.timestamp(o)*1000

            if issubclass(type(o), Representable):
                return o.to_dict()

            if isinstance(o, Row):
                return o._asdict()

            return JSONEncoder.default(self, o)
    return CustomJSONEncoder
