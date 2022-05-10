import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { map, Observable, switchMap } from 'rxjs';
import { MovieMeta } from 'src/app/shared/movie/movie-meta';
import { MovieService } from 'src/app/shared/movie/movie.service';
import { WatchSocket } from 'src/app/shared/sockets/watch.socket';

@Component({
    selector: 'app-watch',
    templateUrl: './watch.component.html',
    styleUrls: ['./watch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchComponent implements OnInit {
    movie: MovieMeta | 2 | 1 = 1;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private movieService: MovieService,
        private socket: WatchSocket,
        private ref: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.route.paramMap.pipe(
            switchMap(params => this.movieService.getMovieById(params.get('id')!))
        ).subscribe((movie) => {
            if (movie === undefined) {
                this.movie = 2;
            } else {
                this.movie = movie;
                this.socket.emit('create-room', this.movie.id);
            }
            this.ref.detectChanges();
        });

        this.socket.fromEvent<string>('join-room').subscribe((room_id) => {
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {
                    room: room_id
                },
                queryParamsHandling: 'merge',
            });
            console.log('join', room_id);
        });
    }

    onSeeked(time: number): void {
        this.socket.emit('seeked', time);
    }
}
