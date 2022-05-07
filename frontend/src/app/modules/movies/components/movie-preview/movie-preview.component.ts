import { Component, Input, OnInit } from '@angular/core';
import { MovieMeta } from 'src/app/shared/movie/movie-meta';
import { MovieService } from 'src/app/shared/movie/movie.service';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Component({
    selector: 'app-movie-preview',
    templateUrl: './movie-preview.component.html',
    styleUrls: ['./movie-preview.component.scss']
})
export class MoviePreviewComponent implements OnInit {

    @Input()
    movie!: MovieMeta;

    @Input()
    watchRouterLink!: string | any[];

    thumbnailSrc!: string;

    constructor(
        private movieService: MovieService,
        private storageService: StorageService,
    ) { }

    ngOnInit(): void {
        this.thumbnailSrc = this.movieService.getThumbnailUrl(this.movie.thumbnail_id);
    }

    readableSize(): string {
        return this.storageService.bytesToReadable(this.movie.file_size);
    }

}
