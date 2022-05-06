import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class VideoPlayerComponent implements OnInit, OnChanges, OnDestroy {

    @ViewChild('target', { static: true }) target!: ElementRef;

    // See options: https://videojs.com/guides/options
    @Input() options: any;

    @Input() sources: videojs.Tech.SourceObject[] = [];

    player!: videojs.Player;

    constructor() { }

    ngOnInit(): void {
        this.player = videojs(this.target.nativeElement, this.options, () => {
            this.player.src(this.sources);
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.player) this.player.src(this.sources);
    }

    ngOnDestroy() {
        if (this.player) {
            this.player.dispose();
        }
    }
}
