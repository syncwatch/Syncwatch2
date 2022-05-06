import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DownloadProgress } from 'src/app/shared/movie/download-progress';
import { MovieService } from 'src/app/shared/movie/movie.service';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Component({
    selector: 'app-download-button',
    templateUrl: './download-button.component.html',
    styleUrls: ['./download-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadButtonComponent implements OnInit {

    @Input()
    movieId!: string;

    downloadProgress$!: Observable<DownloadProgress>;
    downloadSpeed$!: Observable<string>;

    constructor(
        private movieService: MovieService,
        private storageService: StorageService,
    ) { }

    ngOnInit(): void {
        this.downloadProgress$ = this.movieService.getMovieDownloadProgress(this.movieId);
        this.downloadSpeed$ = this.movieService.downloadSpeed.pipe(
            map((speed: number) => this.storageService.bytesToReadable(speed) + ' / s')
        );
    }

    triggerDownload(): void {
        this.movieService.triggerMovieDownload(this.movieId);
    }

    deleteDownload(): void {
        this.movieService.deleteMovieDownload(this.movieId);
    }
}
