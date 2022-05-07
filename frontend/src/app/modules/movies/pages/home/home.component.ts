import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieMeta } from 'src/app/shared/movie/movie-meta';
import { MovieService } from 'src/app/shared/movie/movie.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

    allMovies$!: Observable<MovieMeta[]>;

    constructor(
        private movieService: MovieService,
    ) { }

    ngOnInit(): void {
        this.allMovies$ = this.movieService.getMovies();
    }

}
