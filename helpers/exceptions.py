import werkzeug


class DuplicateSessionTokenException(Exception):
    pass


class WrongInputException(werkzeug.exceptions.HTTPException):
    code = 400


class UnauthorizedException(werkzeug.exceptions.HTTPException):
    code = 401


class NotFoundException(werkzeug.exceptions.HTTPException):
    code = 404


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


class MovieIdMissingException(WrongInputException):
    def __init__(self, *args, **kwargs):
        self.description = 'movie_id_missing_exception'
        super().__init__(*args, **kwargs)


class ThumbnailIdMissingException(WrongInputException):
    def __init__(self, *args, **kwargs):
        self.description = 'thumbnail_id_missing_exception'
        super().__init__(*args, **kwargs)


class SubtitleIdMissingException(WrongInputException):
    def __init__(self, *args, **kwargs):
        self.description = 'subtitle_id_missing_exception'
        super().__init__(*args, **kwargs)


class MovieNotFoundException(NotFoundException):
    def __init__(self, *args, **kwargs):
        self.description = 'movie_not_found_exception'
        super().__init__(*args, **kwargs)


class ThumbnailNotFoundException(NotFoundException):
    def __init__(self, *args, **kwargs):
        self.description = 'thumbnail_not_found_exception'
        super().__init__(*args, **kwargs)


class SubtitleNotFoundException(NotFoundException):
    def __init__(self, *args, **kwargs):
        self.description = 'subtitle_not_found_exception'
        super().__init__(*args, **kwargs)

