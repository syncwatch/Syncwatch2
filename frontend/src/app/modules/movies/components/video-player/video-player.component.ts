import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
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
    @ViewChild('altVideoElement', { static: true }) altVideoElement!: ElementRef;


    @Input() movie!: MovieMeta;

    @Output()
    onPlay = new EventEmitter<number>();

    @Output()
    onPause = new EventEmitter<number>();

    @Output()
    onTimeUpdate = new EventEmitter<number>();

    @Output()
    onSeeked = new EventEmitter<number>();

    originalVideo!: MovieMeta;
    alternativeVideos: MovieMeta[] = [];
    subtitles: MovieMeta[] = [];

    player!: videojs.Player;
    altPlayer!: videojs.Player;
    selectedAlternative: MovieMeta | undefined;

    isAutoPlayMuted = true;
    private clickTimeout: any | undefined;

    fullscreenDoubleClickDelay = 500;

    offsetAltAudio = 0; // value to adjust an offset for the alternative audio
    private altAudioOffsetStack: number[] = [];
    private altAudioOffsetStackSize = 10;
    altAudioAdjustingScore = 0; // a score that goes more positive if it is on a slower device
    private altAudioAdjustingScoreMax = 1;
    private altAudioOffsetTolerance = 0.0;
    private altAudioOffsetToleranceIncrement = 0.03;

    private median(arr: number[], vdefault: number = 0): number {
        if (arr.length === 0) return vdefault;
        if (arr.length === 1) return arr[0];
        const mid = Math.floor(arr.length / 2);
        const nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };

    constructor(
        private ref: ChangeDetectorRef,
        private movieService: MovieService,
    ) { }

    ngOnInit(): void {
        const component: any = this;
        const CustomPlayer = videojs.extend(videojs.getComponent('Player'), {
            _volume: function (percentAsDecimal) {
                const _this = <any>this;
                let vol;

                if (percentAsDecimal !== undefined) {
                    // Force value to between 0 and 1
                    vol = Math.max(0, Math.min(1, parseFloat(percentAsDecimal)));
                    _this.cache_.volume = vol;
                    _this.techCall_('setVolume', vol);

                    if (vol > 0) {
                        _this.lastVolume_(vol);
                    }

                    return;
                }

                // Default to 1 when returning current volume.
                vol = parseFloat(_this.techGet_('volume'));
                return (isNaN(vol)) ? 1 : vol;
            },
            volume: function (percentAsDecimal) {
                const _this = <any>this;
                if (component.selectedAlternative !== undefined && this.id() === 'player') {
                    return component.altPlayer._volume(percentAsDecimal);
                }
                return _this._volume(percentAsDecimal);
            },
            _muted: function (muted) {
                const _this = <any>this;
                if (muted !== undefined) {
                    _this.techCall_('setMuted', muted);
                    return;
                }
                return _this.techGet_('muted') || false;
            },
            muted: function (muted) {
                const _this = <any>this;
                if (component.selectedAlternative !== undefined && this.id() === 'player') {
                    return component.altPlayer._muted(muted);
                }
                return _this._muted(muted);
            },
        });

        videojs.registerComponent('Player', CustomPlayer);

        this.player = videojs(this.videoElement.nativeElement, {
            id: 'player',
            userActions: {
                click: () => { this.onClick() },
                doubleClick: () => { this.onDoubleClick() },
            },
            fluid: true,
            controlBar: {
                volumePanel: {
                    inline: false,
                },
            },
        }, () => {
            this.onPlayerReady();
        });

        this.altPlayer = videojs(this.altVideoElement.nativeElement, {
            id: 'altPlayer',
        }, () => {
            // console.log('onPlayerReady');
        });
    }

    onPlayerReady(): void {
        this.player.one('play', () => {
            this.onPlayerFirstPlay();
        });

        this.player.on('play', () => {
            this.onPlayerPlay();
        });

        this.player.on('pause', () => {
            this.onPlayerPause();
        });

        this.player.on('timeupdate', () => {
            this.onPlayerTimeUpdate();
        });

        this.player.on('seeked', (e) => {
            this.onPlayerSeeked();
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
            this.player.audioTracks().addTrack(<any>new videojs.AudioTrack(<any>{
                enabled: false,
                id: alt.id,
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
        if (track.id === 'video') { // switch to original sound
            this.selectedAlternative = undefined;
            this.player.muted(this.altPlayer.muted());
            this.player.volume(this.altPlayer.volume());
            this.altPlayer.muted(true);
            this.altPlayer.pause();
        } else { // switch to alternative sound
            for (let alt of this.alternativeVideos) {
                if (alt.id === track.id) {
                    if (this.selectedAlternative === undefined) {
                        this.altPlayer.muted(this.player.muted());
                        this.altPlayer.volume(this.player.volume());
                        this.player.muted(true);
                    }
                    this.selectedAlternative = alt;
                    this.player.trigger('volumechange');
                    this.altPlayer.src(
                        [{ src: this.movieService.getMovieStreamUrl(alt.id), type: alt.mime_type! }]
                    );
                    if (!this.player.paused()) this.altPlayer.play();
                    return;
                }
            }
        }
    }

    onClick(): void {
        if (this.clickTimeout !== undefined) clearTimeout(this.clickTimeout);
        this.clickTimeout = setTimeout(() => {
            if (this.player.paused()) {
                this.player.play();
            } else {
                this.player.pause();
            }
        }, this.fullscreenDoubleClickDelay);
    }

    onDoubleClick(): void {
        if (this.clickTimeout !== undefined) clearTimeout(this.clickTimeout);
        if (this.player.isFullscreen()) {
            this.player.exitFullscreen();
        } else {
            this.player.requestFullscreen();
        }
    }

    onPlayerFirstPlay(): void {
        this.player.muted(false);
        if (this.player.paused()) {
            this.isAutoPlayMuted = true;
            const modal = this.player.createModal('Your player is currently muted, press to unmute!', {});
            modal.on('click', () => {
                this.player.muted(false);
                modal.close();
            });
            this.player.muted(true);
            this.player.play();
        }
    }

    onPlayerPlay(): void {
        if (this.selectedAlternative !== undefined) { // update alt player
            this.altPlayer.play();
        }
        this.onPlay.emit(this.player.currentTime());
    }

    onPlayerPause(): void {
        if (this.selectedAlternative !== undefined) { // update alt player
            this.altPlayer.pause();
        }
        this.onPause.emit(this.player.currentTime());
    }

    onPlayerSeeked(): void {
        if (this.selectedAlternative !== undefined) { // update alt player
            this.altPlayer.currentTime(this.player.currentTime());
        }
        this.onSeeked.emit(this.player.currentTime());
    }

    onPlayerTimeUpdate(): void {
        if (this.selectedAlternative !== undefined) { // update alt player
            if (Math.abs(this.altPlayer.currentTime() - this.player.currentTime() + this.offsetAltAudio) > this.altAudioOffsetTolerance) {
                this.altPlayer.currentTime(this.player.currentTime() - this.offsetAltAudio - this.median(this.altAudioOffsetStack));
                if (this.altAudioAdjustingScore < this.altAudioAdjustingScoreMax) {
                    this.altAudioAdjustingScore++;
                }
            } else {
                if (this.altAudioAdjustingScore > -this.altAudioAdjustingScoreMax) {
                    this.altAudioAdjustingScore--;
                }
            }
            if (this.altAudioAdjustingScore > 0) {
                this.altAudioOffsetTolerance += this.altAudioOffsetToleranceIncrement;
            }
            if (this.altAudioOffsetStack.length >= this.altAudioOffsetStackSize) {
                this.altAudioOffsetStack.shift();
            }
            this.altAudioOffsetStack.push(this.altPlayer.currentTime() - this.player.currentTime() + this.offsetAltAudio);

        }
        this.onTimeUpdate.emit(this.player.currentTime());
    }

    ngOnDestroy(): void {
        if (this.player) {
            this.player.dispose();
        }
        if (this.altPlayer) {
            this.altPlayer.dispose();
        }
    }
}
