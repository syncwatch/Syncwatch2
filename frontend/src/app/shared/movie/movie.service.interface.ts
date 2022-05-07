import { Observable } from "rxjs";
import { MovieMeta } from "./movie-meta";
import videojs from "video.js";
import { DownloadProgress } from "./download-progress";
import { SafeUrl } from "@angular/platform-browser";

export interface IMovieService {
    getMovies(): Observable<MovieMeta[]>;

    getMovieDownloadProgress(id: string): Observable<DownloadProgress>;

    triggerMovieDownload(id: string): Promise<void>;

    deleteMovieDownload(id: string): Promise<void>;

    getMovieById(id: string): Promise<MovieMeta | undefined>;

    getMovieSources(id: string): Promise<videojs.Tech.SourceObject[]>;

    getMovieThumbnailSource(thumbnail_id: string | null): Promise<string | SafeUrl>;
}
