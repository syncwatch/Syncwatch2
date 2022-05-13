import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        this.route.queryParamMap.subscribe((queryParams) => {
            const room = queryParams.get('room');
            this.route.paramMap.subscribe((params) => {
                const movie_id = params.get('id');
                if (room === null) {
                    this.socket.emit('create-room', movie_id);
                } else {
                    this.socket.emit('join-room', room, movie_id);
                }
            });

        });

        this.socket.on('join-room', (room_id: string) => {
            console.log('join-room', room_id);

            // this.router.navigate([], {
            //     relativeTo: this.route,
            //     queryParams: {
            //         room: room_id
            //     },
            //     queryParamsHandling: 'merge',
            // });
        });
    }

    onSeeked(time: number): void {
        this.socket.emit('seeked', time);
    }
}
