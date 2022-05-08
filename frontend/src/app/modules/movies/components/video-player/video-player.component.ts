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

        this.player.audioTracks().on('change', () => {
            const tracks = this.player.audioTracks();
            for (var i = 0; i < tracks.length; i++) {
                const track = tracks[i];
                if (track.enabled) {
                    this.changeAudioTrack(track);
                    return;
                }
            }
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
        const audioTracks = this.player.audioTracks();
        for (let i = audioTracks.length - 1; i >= 0; i--) {
            this.player.audioTracks().removeTrack(audioTracks[i]);
        }
        const textTracks = this.player.remoteTextTracks();
        for (let i = textTracks.length - 1; i >= 0; i--) {
            this.player.removeRemoteTextTrack(<any>textTracks[i]);
        }
        this.player!.src(
            [{ src: this.movieService.getMovieStreamUrl(this.originalVideo.id), type: this.originalVideo.mime_type! }],
        );

        this.player.audioTracks().addTrack(<any>new videojs.AudioTrack({
            enabled: true,
            id: 'video',
            kind: 'main',
            label: 'original',
            language: 'en',
        }));


        for (let alt of this.alternativeVideos) {
            this.player.audioTracks().addTrack(<any>new videojs.AudioTrack({
                enabled: false,
                id: alt.title,
                kind: 'translation',
                label: alt.title,
                language: alt.title,
            }));
        }

        for (let sub of this.subtitles) {
            this.player!.addRemoteTextTrack({
                src: this.movieService.getSubtitleUrl(sub.id),
                srclang: sub.title,
            }, false);
        }
    }

    changeAudioTrack(track: videojs.VideojsAudioTrack): void {
        console.log(track);
    }

    ngOnDestroy(): void {
        if (this.player) {
            this.player.dispose();
        }
    }
}
