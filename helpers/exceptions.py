import werkzeug


class DuplicateSessionTokenException(Exception):
    pass


class WrongInputException(werkzeug.exceptions.HTTPException):
    code = 400


class UnauthorizedException(werkzeug.exceptions.HTTPException):
    code = 401


class LoginMissingException(WrongInputException):
    def __init__(self, *args, **kwargs):
        self.description = 'login_data_missing_exception'
        super().__init__(*args, **kwargs)


class LoginIncorrectException(WrongInputException):
    def __init__(self, *args, **kwargs):
        self.description = 'login_data_wrong_exception'
        super().__init__(*args, **kwargs)


class SessionUnauthorizedException(UnauthorizedException):
    def __init__(self, *args, **kwargs):
        self.description = 'session_unauthorized_exception'
        super().__init__(*args, **kwargs)


class SessionExpiredException(UnauthorizedException):
    def __init__(self, *args, **kwargs):
        self.description = 'session_expired_exception'
        super().__init__(*args, **kwargs)
