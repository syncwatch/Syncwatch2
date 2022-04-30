import logging

import sqlalchemy as db
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session, relationship
from typing import *

from helpers.exceptions import DuplicateSessionTokenException


class Representable:
    def __repr__(self) -> str:
        return self._repr(**{k: v for k, v in self.__dict__.items() if not k.startswith('_')})

    def _repr(self, **fields: Dict[str, Any]) -> str:
        """
        Helper for __repr__
        """
        field_strings = []
        at_least_one_attached_attribute = False
        for key, field in fields.items():
            try:
                field_strings.append(f'{key}={field!r}')
            except db.orm.exc.DetachedInstanceError:
                field_strings.append(f'{key}=DetachedInstanceError')
            else:
                at_least_one_attached_attribute = True
        if at_least_one_attached_attribute:
            return f"<{self.__class__.__name__}({','.join(field_strings)})>"
        return f"<{self.__class__.__name__} {id(self)}>"


Base = declarative_base(cls=Representable)


class User(Base):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    permission = db.Column(db.Integer, nullable=False)
    premium = db.Column(db.Boolean, nullable=False)
    sessions = relationship("DeviceSession")


class DeviceSession(Base):
    __tablename__ = 'device_session'
    session_token = db.Column(db.String, primary_key=True)
    expires = db.Column(db.Integer, nullable=False)
    device_info = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class Database:
    def __init__(self, db_url: str, logger: Optional[logging.Logger] = None):
        engine = db.create_engine(db_url)

        Base.metadata.create_all(engine)

        self.logger = logger

        session_factory = sessionmaker(bind=engine)

        self.Session = scoped_session(session_factory)

    def add_user(self, username: str, password_hash: str, permission: int, premium: bool):
        session = self.Session()
        session.add(User(username=username,
                         password_hash=password_hash,
                         permission=permission,
                         premium=premium))
        session.commit()

    def get_users(self) -> List[User]:
        session = self.Session()
        stmt = db.select(User.username)
        return session.scalars(stmt).all()

    def get_user_by_username(self, username) -> Optional[User]:
        session = self.Session()
        stmt = db.select(User).where(User.username == username)
        return session.scalars(stmt).first()

    def add_device_session(self, user_id: int, session_token: str, expires: int, device_info: str):
        session = self.Session()
        session.add(DeviceSession(user_id=user_id,
                                  session_token=session_token,
                                  expires=expires,
                                  device_info=device_info))
        try:
            session.commit()
        except IntegrityError:
            session.rollback()
            raise DuplicateSessionTokenException()

    def get_device_session(self, session_token: str, current_time: int) -> Optional[Tuple[DeviceSession, User]]:
        session = self.Session()
        stmt = session.query(DeviceSession, User).where(db.and_(
            DeviceSession.session_token == session_token,
            db.or_(DeviceSession.expires < 0, DeviceSession.expires > current_time)
        )).join(User)
        return stmt.first()

    def delete_device_session(self, session_token: str):
        session = self.Session()
        session.query(DeviceSession).filter(DeviceSession.session_token == session_token).delete()
        session.commit()
