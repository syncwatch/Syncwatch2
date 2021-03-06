import base64
import json
import os
import re
from logging import Logger
from typing import List

from mimetypes import guess_type

from fastapi.responses import FileResponse, Response

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
                        current_path: str,
                        series: str = None,
                        season: str = None,
                        episode: str = None,
                        thumbnail_id: str = None,
                        ):
        full_path = os.path.join(self.data_path, current_path)
        if os.path.isfile(full_path):
            full_basename = os.path.basename(current_path)
            if full_basename == INFO_FILE:
                return

            sw_type = None

            basename, ext = os.path.splitext(full_basename)
            mime_type = guess_mime_type(current_path)
            if mime_type == '':
                self.logger.warning('cannot evaluate mime type of ' + full_path + ' SKIPPING...')
                return

            video_or_audio = mime_type.startswith('video/') or mime_type.startswith('audio/')
            if video_or_audio:
                if basename == 'video':
                    sw_type = 'video-original'
                else:
                    sw_type = 'video-alternative'

            elif basename.startswith(THUMBNAIL_PREFIX) and mime_type.startswith('image/'):
                sw_type = 'thumbnail'

            elif mime_type == VTT_MIME_TYPE:
                sw_type = 'subtitle'

            if sw_type is None:
                self.logger.warning('cannot evaluate role of ' + full_path + ' SKIPPING...')
                return

            self.db.update_movie_meta(MovieMeta(
                id=path_to_id(current_path),
                relative_path=current_path,
                title=basename,
                thumbnail_id=thumbnail_id,
                hash=hash_file(full_path),
                file_size=os.stat(full_path).st_size,
                mime_type=mime_type,
                sw_type=sw_type,
                series=series,
                season=season,
                episode=episode,
            ))
            return
        files = os.listdir(full_path)
        thumbnails = list(filter(
            lambda x: x.startswith(THUMBNAIL_PREFIX) and guess_mime_type(x).startswith('image/'), files
        ))
        if len(thumbnails) > 0:
            thumbnail_id = path_to_id(os.path.join(current_path, thumbnails[0]))

        pid = path_to_id(current_path)
        sw_type = None
        if current_path.endswith(SERIES_SUFFIX):
            series = pid
            sw_type = 'series'
        elif current_path.endswith(SEASON_SUFFIX):
            season = pid
            sw_type = 'season'
        elif current_path.endswith(EPISODE_SUFFIX):
            episode = pid
            sw_type = 'episode'

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
                relative_path=current_path,
                title=os.path.splitext(os.path.basename(current_path))[0],
                thumbnail_id=thumbnail_id,
                sw_type=sw_type,
                series=series,
                season=season,
                episode=episode,
                info=info_string,
            ))

        for f in files:
            self.walk_movie_tree(os.path.join(current_path, f), series, season, episode, thumbnail_id)

    def update_movies(self):
        self.walk_movie_tree('')

    def get_movie_meta_by_id(self, mid: str) -> MovieMeta:
        return self.db.get_movie_meta_by_id(mid)

    def get_movies_meta(self) -> List[MovieMeta]:
        return self.db.get_movie_meta_by_sw_type_prefix('video-')

    def get_thumbnail(self, tid: str) -> Response:
        thumbnail = self.get_movie_meta_by_id(tid)
        if thumbnail is None or not thumbnail.sw_type == 'thumbnail':
            raise ThumbnailNotFoundException()
        return FileResponse(os.path.join(self.data_path, thumbnail.relative_path), media_type=thumbnail.mime_type)

    def stream_movie(
            self,
            mid: str,
            range_header: str = None,
    ) -> Response:
        movie = self.get_movie_meta_by_id(mid)
        if movie is None or not movie.sw_type.startswith('video-'):
            raise MovieNotFoundException()
        full_path = os.path.join(self.data_path, movie.relative_path)

        file_size = os.stat(full_path).st_size
        start = 0
        length = file_size

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
        return Response(
            content=chunk,
            status_code=206 if length < file_size else 200,
            headers={
                'Content-Range': 'bytes {0}-{1}/{2}'.format(start, start + length - 1, file_size),
                'Accept-Ranges': 'bytes',
                'Content-Type': movie.mime_type,
                'Content-Disposition': 'inline',
                'Content-Length': str(length),
            },
        )
