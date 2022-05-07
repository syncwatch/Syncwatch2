import base64
import json
import os
import re
from logging import Logger
from threading import Thread
from typing import List

import werkzeug
from flask import request, send_file
from mimetypes import guess_type

from helpers.crypt import hash_file, hash_string
from helpers.data_manager_part import DataManagerPart
from helpers.db import Database, Representable, MovieMeta
from helpers.exceptions import MovieNotFoundException, ThumbnailNotFoundException

SERIES_SUFFIX = '.series'
SEASON_SUFFIX = '.season'
EPISODE_SUFFIX = '.episode'
THUMBNAIL_PREFIX = 'thumb'
INFO_FILE = 'info.json'
VTT_MIME_TYPE = 'text/vtt'


def guess_mime_type(file_path: str) -> str:
    if file_path.endswith('.vtt'):
        return VTT_MIME_TYPE
    mime_type = guess_type(file_path)[0]
    if mime_type is None:
        return ''
    return mime_type


def path_to_id(file_path: str) -> str:
    # return base64.urlsafe_b64encode(file_path.encode('utf-8')).decode('utf-8')
    return hash_string(file_path)


class MovieManager(DataManagerPart):
    def __init__(self, data_path: str):
        self.data_path = data_path

    def initialize(self, db: Database = None, logger: Logger = None):
        super().initialize(db, logger)
        self.update_movies()

    def walk_movie_tree(self,
                        current_path: str = '',
                        series_id: str = None,
                        season_id: str = None,
                        episode_id: str = None,
                        thumbnail_id: str = None,
                        ) -> int:
        pid = path_to_id(current_path)
        full_path = os.path.join(self.data_path, current_path)
        if os.path.isfile(full_path):
            full_basename = os.path.basename(current_path)
            if full_basename == INFO_FILE:
                return 0

            sw_type = None

            basename, ext = os.path.splitext(full_basename)
            mime_type = guess_mime_type(current_path)
            if mime_type == '':
                self.logger.warning('cannot evaluate mime type of ' + full_path + ' SKIPPING...')
                return 0

            video_or_audio = mime_type.startswith('video/') or mime_type.startswith('audio/')
            if video_or_audio:
                if episode_id is None:
                    sw_type = 'video'
                elif basename == 'video':
                    sw_type = 'video-original'
                else:
                    sw_type = 'video-alternative'

            elif basename.startswith(THUMBNAIL_PREFIX) and mime_type.startswith('image/'):
                sw_type = 'thumbnail'

            elif mime_type == VTT_MIME_TYPE:
                sw_type = 'subtitle'

            if sw_type is None:
                self.logger.warning('cannot evaluate role of ' + full_path + ' SKIPPING...')
                return 0

            file_size = os.stat(full_path).st_size
            self.db.update_movie_meta(MovieMeta(
                id=pid,
                t_relative_path=current_path,
                title=basename,
                thumbnail_id=thumbnail_id,
                hash=hash_file(full_path),
                file_size=file_size,
                mime_type=mime_type,
                sw_type=sw_type,
                series_id=series_id,
                season_id=season_id,
                episode_id=episode_id,
            ))
            return file_size

        files = os.listdir(full_path)
        thumbnails = list(filter(
            lambda x: x.startswith(THUMBNAIL_PREFIX) and guess_mime_type(x).startswith('image/'), files
        ))
        if len(thumbnails) > 0:
            thumbnail_id = path_to_id(os.path.join(current_path, thumbnails[0]))

        sw_type = None
        if current_path.endswith(SERIES_SUFFIX):
            series_id = pid
            sw_type = 'series'
        elif current_path.endswith(SEASON_SUFFIX):
            season_id = pid
            sw_type = 'season'
        elif current_path.endswith(EPISODE_SUFFIX):
            episode_id = pid
            sw_type = 'episode'

        file_size = 0

        for f in files:
            file_size += self.walk_movie_tree(os.path.join(current_path, f),
                                              series_id,
                                              season_id,
                                              episode_id,
                                              thumbnail_id)

        if sw_type is not None:
            info_string = None
            info_path = os.path.join(full_path, INFO_FILE)
            if os.path.isfile(info_path):
                with open(info_path, 'r') as f:
                    try:
                        info_string = f.read()
                        json.loads(info_string)
                    except json.decoder.JSONDecodeError as e:
                        self.logger.warning(f"cannot parse \"{info_path}\": {e}")

            self.db.update_movie_meta(MovieMeta(
                id=pid,
                t_relative_path=current_path,
                title=os.path.splitext(os.path.basename(current_path))[0],
                thumbnail_id=thumbnail_id,
                file_size=file_size,
                sw_type=sw_type,
                series_id=series_id,
                season_id=season_id,
                episode_id=episode_id,
                info=info_string,
            ))

        return file_size

    def update_movies(self):
        Thread(target=self.walk_movie_tree).start()

    def get_movie_meta_by_id(self, mid: str) -> MovieMeta:
        return self.db.get_movie_meta_by_id(mid)

    def get_movies_meta(self) -> List[MovieMeta]:
        return self.db.get_movie_meta()

    def get_thumbnail(self, tid: str) -> werkzeug.Response:
        thumbnail = self.get_movie_meta_by_id(tid)
        if thumbnail is None or not thumbnail.sw_type == 'thumbnail':
            raise ThumbnailNotFoundException()
        return send_file(os.path.join(self.data_path, thumbnail.t_relative_path), mimetype=thumbnail.mime_type)

    def stream_movie(self, mid: str) -> werkzeug.Response:
        movie = self.get_movie_meta_by_id(mid)
        if movie is None or not movie.sw_type.startswith('video'):
            raise MovieNotFoundException()
        full_path = os.path.join(self.data_path, movie.t_relative_path)

        file_size = os.stat(full_path).st_size
        start = 0
        length = file_size

        range_header = request.headers.get('Range', None)
        if range_header:
            m = re.search('bytes=([0-9]+)-([0-9]*)', range_header)
            g = m.groups()
            byte1, byte2 = 0, None
            if g[0]:
                byte1 = int(g[0])
            if g[1]:
                byte2 = int(g[1])
            if byte1 < file_size:
                start = byte1
            if byte2:
                length = byte2 + 1 - byte1
            else:
                length = file_size - start

            if length > file_size:
                length = file_size

        with open(full_path, 'rb') as f:
            f.seek(start)
            chunk = f.read(length)

        rv = werkzeug.Response(
            chunk,
            206 if length < file_size else 200,
            headers={
                'Content-Range': 'bytes {0}-{1}/{2}'.format(start, start + length - 1, file_size),
                'Accept-Ranges': 'bytes',
                'Content-Type': movie.mime_type,
                'Content-Disposition': 'inline',
                'Content-Length': length,
            },
            direct_passthrough=True
        )
        return rv
