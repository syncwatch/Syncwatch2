import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MovieMeta } from 'src/app/shared/movie/movie-meta';
import { MovieService } from 'src/app/shared/movie/movie.service';
import videojs from 'video.js';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class VideoPlayerComponent implements OnInit, OnDestroy {

    @ViewChild('videoElement', { static: true }) videoElement!: ElementRef;


    @Input() movie!: MovieMeta;

    originalVideo!: MovieMeta;
    alternativeVideos: MovieMeta[] = [];
    subtitles: MovieMeta[] = [];

    player!: videojs.Player;

    isAutoPlayMuted = true;

    constructor(
        private movieService: MovieService,
    ) { }

    ngOnInit(): void {
        this.player = videojs(this.videoElement.nativeElement, { autoplay: true, controls: true }, () => {
            console.log('onPlayerReady');
        });

        this.player.one('play', () => {
            this.onFirstPlay();
        });

        this.player.on('play', () => {
            this.onPlay();
        });

        if (this.movie.sw_type == 'episode') {
            this.movieService.getMovies().subscribe(movies => {
                this.alternativeVideos = [];
                this.subtitles = [];
                for (let movie of movies.filter((movie) => movie.episode_id === this.movie.id)) {
                    switch (movie.sw_type) {
                        case 'video-original':
                            this.originalVideo = movie;
                            break;
                        case 'video-alternative':
                            this.alternativeVideos.push(movie);
                            break;
                        case 'subtitle':
                            this.subtitles.push(movie);
                            break;
                    }
                }
                this.setSource();
                this.setSource();
            });
            return;
        }
        this.originalVideo = this.movie;
        this.setSource();
    }

    onFirstPlay(): void {
        this.player.muted(false);
        if (this.player.paused()) {
            this.isAutoPlayMuted = true;
            this.player.muted(true);
            this.player.play();
        }
    }

    onPlay(): void {
        console.log('onplay');
    }

    setSource(): void {
        const tracks = this.player.remoteTextTracks();
        for(let i = tracks.length - 1; i >=0; i--) {
            this.player.removeRemoteTextTrack(<any>tracks[i]);
        }
        this.player!.src(
            [{ src: this.movieService.getMovieStreamUrl(this.originalVideo.id), type: this.originalVideo.mime_type! }],
        );
        for (let sub of this.subtitles) {
            this.player!.addRemoteTextTrack({
                src: this.movieService.getSubtitleUrl(sub.id),
                srclang: sub.title,
            }, false);
        }
    }

    ngOnDestroy(): void {
        if (this.player) {
            this.player.dispose();
        }
    }
}
