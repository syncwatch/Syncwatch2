from datetime import datetime

from sqlalchemy.engine import Row

from helpers.db import Representable


class DictConversionException(TypeError):
    pass


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

    raise DictConversionException()
