import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/shared/movie/movie.service';
import videojs from 'video.js';

@Component({
    selector: 'app-watch',
    templateUrl: './watch.component.html',
    styleUrls: ['./watch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchComponent implements OnInit {
    loading = true;
    videoSrc: videojs.Tech.SourceObject[] | null = null;
    movieId: string | null = null;

    constructor(
        private ref: ChangeDetectorRef,
        private route: ActivatedRoute,
        private movieService: MovieService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => this.loadMovie(params.get('id')));
    }

    loadMovie(id: string | null) {
        if (id === null) {
            this.videoSrc = null;
            this.movieId = null;
            this.ref.detectChanges();
            return;
        }
        this.movieId = id;
        this.movieService.getMovieSources(id).then(src => {
            this.videoSrc = src;
            this.loading = false;
            this.ref.detectChanges();
        }).catch(() => {
            this.videoSrc = null;
            this.loading = false;
            this.ref.detectChanges();
        });
    }
}
