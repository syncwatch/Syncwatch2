import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DisplayService } from 'src/app/shared/display/display.service';
import { MovieMeta } from 'src/app/shared/movie/movie-meta';
import { MovieService } from 'src/app/shared/movie/movie.service';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {

    @ViewChild('videoContainer', { static: true }) videoContainer!: ElementRef;
    @ViewChild('videoElement', { static: true }) videoElement!: ElementRef;
    @ViewChild('videoControls', { static: true }) videoControls!: ElementRef;
    @ViewChild('playPauseButton', { static: true }) playPauseButton!: ElementRef;
    @ViewChild('progressContainer', { static: true }) progressContainer!: ElementRef;
    @ViewChild('progress', { static: true }) progress!: ElementRef;
    @ViewChild('progressBar', { static: true }) progressBar!: ElementRef;
    @ViewChild('muteButton', { static: true }) muteButton!: ElementRef;
    @ViewChild('volumeSlider', { static: true }) volumeSlider!: ElementRef;
    @ViewChild('fullscreenButton', { static: true }) fullscreenButton!: ElementRef;


    @Input() movie!: MovieMeta;

    originalVideo!: MovieMeta;
    alternativeVideos: MovieMeta[] = [];
    subtitles: MovieMeta[] = [];

    video!: HTMLVideoElement;

    private hasPlayed = false;
    isAutoPlayMuted = true;

    constructor(
        private movieService: MovieService,
        private displayService: DisplayService,
        private ref: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.video = this.videoElement.nativeElement;

        this.video.controls = false;

        this.videoControls.nativeElement.setAttribute('data-state', 'visible');

        if (!this.displayService.canFullscreen()) this.fullscreenButton.nativeElement.style.display = 'none';

        this.video.autoplay = true;
        this.video.muted = true;

        this.volumeSlider.nativeElement.value = this.video.volume;

        this.video.onplay = (e) => {
            this.onPlay(e);
        };

        this.video.onpause = (e) => {
            this.onPause(e);
        };

        this.video.onvolumechange = (e) => {
            this.onVolumeChange(e);
        };

        this.video.ontimeupdate = (e) => {
            this.onTimeUpdate(e);
        };

        this.video.onloadedmetadata = (e) => {
            this.onLoadedMetaData(e);
        };

        this.initButtonEvents();

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

    initButtonEvents(): void {
        this.playPauseButton.nativeElement.onclick = (e: any) => {
            if (this.video.paused || this.video.ended) this.video.play();
            else this.video.pause();
        };

        this.muteButton.nativeElement.onclick = (e: any) => {
            if (this.video.volume === 0) {
                this.video.volume = 0.5;
                this.volumeSlider.nativeElement.value = this.video.volume;
                this.video.muted = false;
            } else {
                this.video.muted = !this.video.muted;
            }
        };

        this.fullscreenButton.nativeElement.onclick = (e: any) => {
            if (this.videoContainer.nativeElement.getAttribute('data-fullscreen') === 'true') {
                this.displayService.exitFullscreen();
                this.videoContainer.nativeElement.setAttribute('data-fullscreen', false);
                this.fullscreenButton.nativeElement.setAttribute('data-state', 'go-fullscreen');
            } else {
                this.displayService.requestFullscreen(this.videoContainer.nativeElement);
                this.videoContainer.nativeElement.setAttribute('data-fullscreen', true);
                this.fullscreenButton.nativeElement.setAttribute('data-state', 'cancel-fullscreen');
            }
        };

        this.progressContainer.nativeElement.onclick = (e: any) => {
            //var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth; // Also need to take the parent into account here as .controls now has position:relative
            var pos = (e.pageX  - (this.progressContainer.nativeElement.offsetLeft + this.progressContainer.nativeElement.offsetParent.offsetLeft)) / this.progressContainer.nativeElement.offsetWidth;
            console.log(pos);
            this.video.currentTime = pos * this.video.duration;
        };

        this.volumeSlider.nativeElement.oninput = (e: any) => {
            this.video.volume = +this.volumeSlider.nativeElement.value;
        }
    }

    setSource(): void {
        for (let child of <any>this.video.children) {
            this.video.removeChild(child);
        }
        const source = document.createElement('source');
        source.src = this.movieService.getMovieStreamUrl(this.originalVideo.id);
        source.type = this.originalVideo.mime_type!;
        this.video.appendChild(source);

        for (const alt of this.alternativeVideos) {
        }

        for (const sub of this.subtitles) {
            const track = document.createElement('track');
            track.default = false;
            track.kind = 'captions';
            track.srclang = sub.title;
            track.src = this.movieService.getSubtitleUrl(sub.id);
            this.video.appendChild(track);
        }
    }

    onFirstPlay(e: Event): void {
        this.video.muted = false;
        if (this.video.paused) {
            this.isAutoPlayMuted = true;
            this.video.muted = true;
            this.video.play();
        }
    }

    onPlayPause(e: Event): void {
        if (this.video.paused || this.video.ended) {
            this.playPauseButton.nativeElement.setAttribute('data-state', 'play');
        } else {
            this.playPauseButton.nativeElement.setAttribute('data-state', 'pause');
        }
    }

    onPlay(e: Event): void {
        if (!this.hasPlayed) {
            this.onFirstPlay(e);
            this.hasPlayed = true;
        }
        this.onPlayPause(e);
    }

    onPause(e: Event): void {
        this.onPlayPause(e);
    }

    onVolumeChange(e: Event): void {
        if (this.video.volume === 0 || this.video.muted) {
            this.muteButton.nativeElement.setAttribute('data-state', 'unmute');
        } else {
            this.muteButton.nativeElement.setAttribute('data-state', 'mute');
        }
    }

    onLoadedMetaData(e: Event): void {
        this.progress.nativeElement.setAttribute('max', this.video.duration);
    }

    onTimeUpdate(e: Event): void {
        if (!this.progress.nativeElement.getAttribute('max')) this.progress.nativeElement.setAttribute('max', this.video.duration);
		this.progress.nativeElement.value = this.video.currentTime;
		this.progress.nativeElement.style.width = Math.floor((this.video.currentTime / this.video.duration) * 100) + '%';
        this.ref.detectChanges();
    }
}
