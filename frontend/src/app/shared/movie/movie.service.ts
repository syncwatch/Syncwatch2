import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import videojs from 'video.js';
import { BehaviorSubject, catchError, firstValueFrom, from, map, Observable, ObservableInput, of } from 'rxjs';
import { MovieMeta } from './movie-meta';
import { IMovieService } from './movie.service.interface';
import { DownloadProgress } from './download-progress';
import { StorageService } from '../storage/storage.service';
import { SyncService } from '../sync/sync.service';
import { api_endpoints } from 'src/environments/environment';


@Injectable()
export class MovieService implements IMovieService {

    private targetChunkRequestTime = 1000;
    private downloadChunkSize = 500000;
    private evaluatingChunkSize = false;
    downloadSpeed = new BehaviorSubject<number>(0);

    private movieDownloads: { [id: string]: BehaviorSubject<DownloadProgress> } = {};

    private stopDownloads: { [id: string]: boolean } = {};

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private storageService: StorageService,
        private syncService: SyncService,
    ) {
    }

    private _getMovieUrl(id: string): string {
        return `${api_endpoints.MOVIE_URL}?id=${id}`;
    }

    private _getMovieStreamUrl(id: string): string {
        return `${api_endpoints.MOVIE_STREAM_URL}?id=${id}&token=${this.authService.getSessionToken()}`;
    }

    private _getThumbnailUrl(id: string): string {
        return `${api_endpoints.THUMBNAIL_URL}?id=${id}&token=${this.authService.getSessionToken()}`;
    }

    async getMovieById(id: string): Promise<MovieMeta | undefined> {
        const storageMovie = await this.storageService.getMovie(id);
        if (this.syncService.isOffline()) return storageMovie;

        const apiMovie = await firstValueFrom((this.http.get<{ movie: MovieMeta }>(this._getMovieUrl(id), {
            headers: {
                'Authorization': this.authService.getSessionToken()
            }
        }).pipe(
            map(data => {
                data.movie.downloaded_size = 0;
                return data.movie;
            }),
            catchError<MovieMeta | undefined, ObservableInput<MovieMeta | undefined>>(() => {
                return of(storageMovie);
            }),
        )));

        if (storageMovie !== undefined) {
            console.log(storageMovie.hash == apiMovie?.hash)
            return storageMovie;
        }

        return apiMovie;
    }

    getMovies(): Observable<MovieMeta[]> {
        if (this.syncService.isOffline()) return from(this.storageService.getMovies());
        return this.http.get<{ movies: MovieMeta[] }>(api_endpoints.MOVIES_URL, {
            headers: {
                'Authorization': this.authService.getSessionToken()
            }
        }).pipe(
            map(data => data.movies),
            catchError<MovieMeta[], ObservableInput<MovieMeta[]>>(() => {
                return from(this.storageService.getMovies());
            }),
        );
    }

    private _getMovieDownloadProgress(id: string): BehaviorSubject<DownloadProgress> {
        if (!(id in this.movieDownloads)) {
            this.movieDownloads[id] = new BehaviorSubject<DownloadProgress>({ downloaded: 0, downloading: false, deleting: false });
            this.storageService.getMovie(id).then(movie => {
                if (movie === undefined) return;
                this.movieDownloads[id].next({ downloaded: movie.downloaded_size! / movie.file_size!, downloading: false, deleting: false });
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
        await this.storageService.deleteMovieAndFragments(movie.id!);
        progress.next({ deleting: false, downloading: false, downloaded: 0 });
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
        if (movie.thumbnail_id && !movie.downloaded_size) {
            progress.next({ downloaded: 0, downloading: true, deleting: false });
            this._downloadThumbnail(movie.thumbnail_id)
        };
        this._downloadMovieChunk(movie, progress);
    }

    private _downloadMovieChunk(movie: MovieMeta, progress: BehaviorSubject<DownloadProgress>): void {
        if (movie.downloaded_size === undefined) movie.downloaded_size = 0;
        if (movie.file_size && movie.downloaded_size >= movie.file_size) {
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

        this.http.get(
            this._getMovieStreamUrl(movie.id!),
            {
                responseType: 'blob',
                observe: 'response',
                headers: { 'Range': `bytes=${movie.downloaded_size}-${movie.downloaded_size + this.downloadChunkSize}` },
            }).subscribe(async (res: HttpResponse<Blob>) => {
                if (res.body === null) return;
                if (evaluationStart !== undefined) {
                    const chunkRequestTime = Date.now() - evaluationStart;
                    const correctionFactor = Math.min(1.5, Math.max(0.75, this.targetChunkRequestTime / Math.max(1, chunkRequestTime)));
                    this.downloadChunkSize = Math.min(Number.MAX_SAFE_INTEGER, Math.floor(this.downloadChunkSize * correctionFactor));
                    this.downloadSpeed.next(this.downloadChunkSize * 1000 / this.targetChunkRequestTime);
                    this.evaluatingChunkSize = false;
                }
                res.body.arrayBuffer().then(async buffer => {
                    const mime_type = res.headers.get('Content-Type');
                    if (movie.mime_type === undefined && mime_type) movie.mime_type = mime_type;

                    // const range = res.headers.get('Content-Range');
                    // if (movie.content_length === undefined && range) movie.content_length = +range.substring(range.lastIndexOf('/') + 1);

                    const content_length = res.headers.get('Content-Length');
                    if (content_length === null) return;

                    await this.storageService.putMovieFragment({
                        movie_id: <string>movie.id,
                        data: buffer,
                        start: movie.downloaded_size!,
                        end: movie.downloaded_size! + Number(content_length),
                    })
                    movie.downloaded_size! += Number(content_length);
                    await this.storageService.putMovie(movie);
                    progress.next({ downloaded: movie.downloaded_size! / movie.file_size!, downloading: true, deleting: false });
                    this._downloadMovieChunk(movie, progress);
                });
            });
    }

    async getMovieSources(id: string): Promise<videojs.Tech.SourceObject[]> {
        const movie = await this.getMovieById(id);
        if (movie === undefined) return [];
        return [{ src: this._getMovieStreamUrl(id), type: movie.mime_type! }];
    }

    private _downloadThumbnail(thumbnail_id: string) {
        this.http.get(
            this._getThumbnailUrl(thumbnail_id),
            {
                responseType: 'blob',
            }).subscribe(async (blob: Blob) => {
                await this.storageService.putThumbnail({
                    id: thumbnail_id,
                    blob: blob,
                });
            });
    }

    async getMovieThumbnailSource(thumbnail_id: string | null): Promise<string> {
        if (thumbnail_id === null) return '/assets/default-thumbnail.svg';
        return this._getThumbnailUrl(thumbnail_id);
    }
}
