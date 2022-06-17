from fastapi import HTTPException


class DuplicateSessionTokenException(Exception):
    pass


class WrongInputException(HTTPException):
    def __init__(self, status_code=400, detail='wrong_input'):
        super().__init__(status_code, detail)


class UnauthorizedException(HTTPException):
    def __init__(self, status_code=401, detail='unauthorized'):
        super().__init__(status_code, detail)


class NotFoundException(HTTPException):
    def __init__(self, status_code=404, detail='not_found'):
        super().__init__(status_code, detail)


class LoginIncorrectException(WrongInputException):
    def __init__(self):
        super().__init__(detail='login_data_wrong_exception')


class SessionUnauthorizedException(UnauthorizedException):
    def __init__(self):
        super().__init__(detail='session_unauthorized_exception')


class SessionExpiredException(UnauthorizedException):
    def __init__(self):
        super().__init__(detail='session_expired_exception')


class MovieNotFoundException(NotFoundException):
    def __init__(self):
        super().__init__(detail='movie_not_found_exception')


class ThumbnailNotFoundException(NotFoundException):
    def __init__(self):
        super().__init__(detail='thumbnail_not_found_exception')
