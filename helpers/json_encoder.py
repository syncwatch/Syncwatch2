from datetime import datetime

from sqlalchemy.engine import Row
from fastapi.responses import JSONResponse

from helpers.db import Representable


def to_simple_type(o):
    if isinstance(o, datetime):
        return datetime.timestamp(o) * 1000

    if issubclass(type(o), Representable):
        return o.to_dict()

    if isinstance(o, Row):
        return o._asdict()

    if isinstance(o, list):
        return [to_simple_type(x) for x in o]

    if isinstance(o, tuple):
        return (to_simple_type(x) for x in o)

    if isinstance(o, dict):
        return {key: to_simple_type(value) for key, value in o.items()}

    return o


class CustomJSONResponse(JSONResponse):
    def __init__(self, content=None, *args, **kwargs):
        if content is None:
            content = {}
        super().__init__(content=to_simple_type(content), *args, **kwargs)
