import { Observable } from "rxjs";
import { MovieMeta } from "./movie-meta";
import { DownloadProgress } from "./download-progress";
import { SafeUrl } from "@angular/platform-browser";

export interface IMovieService {
    getMovies(): Observable<MovieMeta[]>;

    getMovieDownloadProgress(id: string): Observable<DownloadProgress>;

    triggerMovieDownload(id: string): Promise<void>;

    deleteMovieDownload(id: string): Promise<void>;

    getMovieById(id: string): Promise<MovieMeta | undefined>;

    getMovieStreamUrl(id: string): string;

    getThumbnailUrl(id: string | null): string;

    getSubtitleUrl(id: string): string;
}
