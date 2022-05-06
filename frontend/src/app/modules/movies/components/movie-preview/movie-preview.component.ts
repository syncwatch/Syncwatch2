import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Movie } from 'src/app/shared/movie/movie';
import { MovieService } from 'src/app/shared/movie/movie.service';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Component({
    selector: 'app-movie-preview',
    templateUrl: './movie-preview.component.html',
    styleUrls: ['./movie-preview.component.scss']
})
export class MoviePreviewComponent implements OnInit {

    @Input()
    movie!: Movie;

    @Input()
    watchRouterLink!: string | any[];

    thumbnailSrc: string | SafeUrl = '/assets/default-thumbnail.svg';

    constructor(
        private ref: ChangeDetectorRef,
        private movieService: MovieService,
        private storageService: StorageService,
    ) { }

    ngOnInit(): void {
        this.movieService.getMovieThumbnailSource(this.movie.thumbnail_id).then(src => {
            this.thumbnailSrc = src;
            this.ref.detectChanges();
        });
    }

    readableSize(): string {
        return this.storageService.bytesToReadable(this.movie.file_size);
    }

}
