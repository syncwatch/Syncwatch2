import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable()
export class DisplayService {

    constructor(private deviceService: DeviceDetectorService) { }

    lockOrientation(orientation: OrientationLockType) {
        const s = (<any>screen);
        if (s.orientation) {
            s.orientation.lock(orientation);
        } else if (s.lockOrientation) {
            s.lockOrientation(orientation);
        } else if (s.mozLockOrientation) {
            s.mozLockOrientation(orientation);
        } else if (s.msLockOrientation) {
            s.msLockOrientation(orientation);
        }
    }

    unlockOrientation() {
        const s = (<any>screen);
        if (s.orientation) {
            s.orientation.unlock();
        } else if (s.lockOrientation) {
            s.unlockOrientation();
        } else if (s.mozLockOrientation) {
            s.mozUnlockOrientation();
        } else if (s.msLockOrientation) {
            s.msUnlockOrientation();
        }
    }

    requestFullscreenMobile() {
        if (!this.deviceService.isDesktop()) this.requestFullscreen();
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
