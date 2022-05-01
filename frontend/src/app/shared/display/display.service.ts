import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { window } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DisplayService {

    constructor(private deviceService: DeviceDetectorService) { }

    requestFullscreenMobile() {
        if (this.deviceService.isMobile()) this.requestFullscreen();
    }

    requestFullscreen() {
        const b = (<any>document.body);
        if (b.requestFullscreen) {
            b.requestFullscreen();
        } else if (b.mozRequestFullScreen) { /* Firefox */
            b.mozRequestFullScreen();
        } else if (b.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            b.webkitRequestFullscreen();
        } else if (b.msRequestFullscreen) { /* IE/Edge */
            b.msRequestFullscreen();
        }
    }

    exitFullscreen() {
        if (!this.isFullscreen()) return;
        const d = (<any>document);
        if (d.exitFullscreen) {
            d.exitFullscreen();
        } else if (d.mozCancelFullScreen) { /* Firefox */
            d.mozCancelFullScreen();
        } else if (d.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            d.webkitExitFullscreen();
        } else if (d.msExitFullscreen) { /* IE/Edge */
            d.msExitFullscreen();
        }
    }

    isFullscreen(): boolean {
        const d = (<any>document);
        return d.fullscreenElement ||
            d.webkitFullscreenElement ||
            d.mozFullScreenElement;
    }
}
