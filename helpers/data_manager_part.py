from logging import Logger

from helpers.db import Database


class DataManagerPart:
    db: Database = None
    logger: Logger = None

    def initialize(self, db: Database = None, logger: Logger = None):
        self.db = db
        self.logger = logger
