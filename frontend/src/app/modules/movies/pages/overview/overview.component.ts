import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { MovieMeta } from 'src/app/shared/movie/movie-meta';
import { MovieService } from 'src/app/shared/movie/movie.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent implements OnInit {

    movieType!: string;
    movieId!: string;
    allMovies$!: Observable<MovieMeta[]>;

    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService,
    ) {}

    ngOnInit(): void {
        this.allMovies$ = this.route.paramMap.pipe(
            switchMap(params => {
                const movieId = params.get('id');
                const movieType = params.get('movie_type');
                if (movieId !== null) this.movieId = movieId;
                if (movieType !== null) this.movieType = movieType;
                return this.movieService.getMovies();
            })
        );
    }
}
