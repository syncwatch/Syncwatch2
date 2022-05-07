import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import videojs from 'video.js';
import { BehaviorSubject, firstValueFrom, from, Observable, of } from 'rxjs';
import { MovieMeta } from './movie-meta';
import { IMovieService } from './movie.service.interface';
import { DownloadProgress } from './download-progress';
import { api_endpoints } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class MovieService implements IMovieService {

    private _movies: { [id: string]: MovieMeta } = {
        '1': {
            id: '1',
            corrupt: false,
            title: 'Video',
            hash: '123',
            mime_type: 'video/webm',
            downloaded_size: 0,
            file_size: 500000 * 20,
            thumbnail_id: '123',
            sw_type: 'video-original',
            episode_id: null,
            season_id: null,
            series_id: null,
            info: null,
        },
        '2': {
            id: '2',
            corrupt: false,
            title: 'Bibeo',
            hash: '1234',
            mime_type: 'video/webm',
            downloaded_size: 500000 * 20,
            file_size: 500000 * 20,
            thumbnail_id: '123',
            sw_type: 'video-original',
            episode_id: null,
            season_id: null,
            series_id: null,
            info: null,
        },
    };
    private targetChunkRequestTime = 1000;
    private downloadChunkSize = 500000;
    private evaluatingChunkSize = false;
    downloadSpeed = new BehaviorSubject<number>(0);

    private movieDownloads: { [id: string]: BehaviorSubject<DownloadProgress> } = {};

    private stopDownloads: { [id: string]: boolean } = {};

    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) {
    }

    private _getMovieStreamUrl(id: string): string {
        return `${api_endpoints.MOVIE_STREAM_URL}?id=${id}&token=${this.authService.getSessionToken()}`;
    }

    private _getThumbnailUrl(id: string): string {
        return `${api_endpoints.THUMBNAIL_URL}?id=${id}&token=${this.authService.getSessionToken()}`;
    }

    async getMovieById(id: string): Promise<MovieMeta | undefined> {
        return this._movies[id];
    }

    getMovies(): Observable<MovieMeta[]> {
        return of(Object.values(this._movies));
    }

    private _getMovieDownloadProgress(id: string): BehaviorSubject<DownloadProgress> {
        if (!(id in this.movieDownloads)) {
            this.movieDownloads[id] = new BehaviorSubject<DownloadProgress>({
                downloaded: this._movies[id].downloaded_size! / this._movies[id].file_size!,
                downloading: false,
                deleting: false
            });
        }

        return this.movieDownloads[id];
    }

    getMovieDownloadProgress(id: string): Observable<DownloadProgress> {
        return this._getMovieDownloadProgress(id);

    }

    async deleteMovieDownload(id: string): Promise<void> {
        const movie = await this.getMovieById(id);
        if (movie === undefined) return;
        const progress = this._getMovieDownloadProgress(movie.id!);
        const currentProgress = await firstValueFrom(progress);
        if (currentProgress.deleting || currentProgress.downloading) return;
        progress.next({ deleting: true, downloading: false, downloaded: currentProgress.downloaded });
        setTimeout(() => {
            movie.downloaded_size = 0;
            progress.next({ deleting: false, downloading: false, downloaded: 0 });
        }, 1000);
    }

    async triggerMovieDownload(id: string): Promise<void> {
        const movie = await this.getMovieById(id);
        if (movie === undefined) return;
        const progress = this._getMovieDownloadProgress(movie.id!);
        const currentProgress = await firstValueFrom(progress);
        if (currentProgress.deleting) return;
        if (currentProgress.downloading) {
            if (!(movie.id! in this.stopDownloads)) {
                this.stopDownloads[movie.id!] = true;
                progress.next({ downloaded: currentProgress.downloaded, downloading: false, deleting: currentProgress.deleting });
            }
            return;
        }
        if (movie.thumbnail_id && movie.downloaded_size === 0) {
            progress.next({ downloaded: 0, downloading: true, deleting: false });
            this._downloadThumbnail(movie.thumbnail_id)
        };
        this._downloadMovieChunk(movie, progress);
    }

    private _downloadMovieChunk(movie: MovieMeta, progress: BehaviorSubject<DownloadProgress>): void {
        if (movie.file_size && movie.downloaded_size! >= movie.file_size) {
            progress.next({ downloaded: 1, downloading: false, deleting: false });
            return;
        }

        if (movie.id! in this.stopDownloads) {
            firstValueFrom(progress).then((currentProgress) => {
                progress.next({ downloaded: currentProgress.downloaded, downloading: false, deleting: currentProgress.deleting });
            });
            delete this.stopDownloads[movie.id!];
            return;
        }

        let evaluationStart: number | undefined = undefined;
        if (!this.evaluatingChunkSize) {
            this.evaluatingChunkSize = true;
            evaluationStart = Date.now();
        }

        setTimeout(() => {
            if (evaluationStart !== undefined) {
                const chunkRequestTime = Date.now() - evaluationStart;
                const correctionFactor = Math.min(1.5, Math.max(0.75, this.targetChunkRequestTime / Math.max(1, chunkRequestTime)));
                this.downloadChunkSize = Math.min(Number.MAX_SAFE_INTEGER, Math.floor(this.downloadChunkSize * correctionFactor));
                this.downloadSpeed.next(this.downloadChunkSize * 1000 / this.targetChunkRequestTime);
                this.evaluatingChunkSize = false;
            }

            movie.downloaded_size! += this.downloadChunkSize;
            progress.next({ downloaded: movie.downloaded_size! / movie.file_size!, downloading: true, deleting: false });
            this._downloadMovieChunk(movie, progress);

        }, this.targetChunkRequestTime);
    }

    async getMovieSources(id: string): Promise<videojs.Tech.SourceObject[]> {
        const movie = await this.getMovieById(id);
        if (movie === undefined) return [];
        return [{ src: this._getMovieStreamUrl(id), type: movie.mime_type! }];
    }

    private _downloadThumbnail(thumbnail_id: string) {
    }

    async getMovieThumbnailSource(thumbnail_id: string | null): Promise<string> {
        if (thumbnail_id === null) return '/assets/default-thumbnail.svg';
        return this._getThumbnailUrl(thumbnail_id);
    }
}
