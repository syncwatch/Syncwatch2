import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MovieMeta } from 'src/app/shared/movie/movie-meta';
import { MovieService } from 'src/app/shared/movie/movie.service';
import { SyncService } from 'src/app/shared/sync/sync.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent implements OnInit, OnDestroy {

    allMovies$!: Observable<MovieMeta[]>;

    private onlineSubscription!: Subscription;

    constructor(
        private ref: ChangeDetectorRef,
        private movieService: MovieService,
        private syncService: SyncService
    ) {}

    ngOnInit(): void {
        this.allMovies$ = this.movieService.getMovies();

        this.onlineSubscription = this.syncService.changes.subscribe(() => {
            this.allMovies$ = this.movieService.getMovies();
            this.ref.detectChanges();
        });
    }

    ngOnDestroy(): void {
        if (this.onlineSubscription) this.onlineSubscription.unsubscribe();
    }
}
