from logging import Logger

from helpers.data_manager_part import DataManagerPart
from helpers.db import Database
from helpers.movie_manager import MovieManager


class DataManager(DataManagerPart):
    def __init__(self, data_path: str):
        self.data_path = data_path
        self.movie = MovieManager(data_path)

    def initialize(self, db: Database = None, logger: Logger = None):
        super().initialize(db, logger)
        self.movie.initialize(db, logger)
