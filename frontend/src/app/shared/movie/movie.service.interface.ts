import { Observable } from "rxjs";
import { Movie } from "./movie";
import videojs from "video.js";
import { DownloadProgress } from "./download-progress";
import { SafeUrl } from "@angular/platform-browser";

export interface IMovieService {
    getMovies(): Observable<Movie[]>;

    getMovieDownloadProgress(id: string): Observable<DownloadProgress>;

    triggerMovieDownload(id: string): Promise<void>;

    deleteMovieDownload(id: string): Promise<void>;

    getMovieById(id: string): Promise<Movie | undefined>;

    getMovieSources(id: string): Promise<videojs.Tech.SourceObject[]>;

    getMovieThumbnailSource(thumbnail_id: string | null): Promise<string | SafeUrl>;
}
