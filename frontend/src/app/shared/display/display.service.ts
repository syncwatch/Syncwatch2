import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable()
export class DisplayService {

    constructor(private deviceService: DeviceDetectorService) { }

    lockOrientation(orientation: OrientationLockType) {
        const s = <any>screen;
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
        const s = <any>screen;
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

    canFullscreen(elementType = 'video'): boolean {
        const d = <any>document;
        return !!(d.fullscreenEnabled || d.mozFullScreenEnabled || d.msFullscreenEnabled || d.webkitSupportsFullscreen || d.webkitFullscreenEnabled || d.createElement(elementType).webkitRequestFullScreen);
    }

    requestFullscreenMobile() {
        if (!this.deviceService.isDesktop()) this.requestFullscreen();
    }

    requestFullscreen(el: any = document.body) {
        if (el.requestFullscreen) {
            el.requestFullscreen();
        } else if (el.mozRequestFullScreen) { /* Firefox */
            el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) { /* IE/Edge */
            el.msRequestFullscreen();
        }
    }

    exitFullscreenWithCheck(el: any = document) {
        if (!this.isFullscreen(el)) return;
        this.exitFullscreen(el);
    }

    exitFullscreen(el: any = document) {
        if (el.exitFullscreen) {
            el.exitFullscreen();
        } else if (el.mozCancelFullScreen) { /* Firefox */
            el.mozCancelFullScreen();
        } else if (el.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            el.webkitExitFullscreen();
        } else if (el.msExitFullscreen) { /* IE/Edge */
            el.msExitFullscreen();
        }
    }

    isFullscreen(el: any = document): boolean {
        if(el.fullscreenElement !== undefined) return el.fullscreenElement;
        if(el.webkitFullscreenElement !== undefined) return el.webkitFullscreenElement;
        if(el.mozFullScreenElement !== undefined) return el.mozFullScreenElement;
        if(el.msFullscreenElement !== undefined) return el.msFullscreenElement;
        return false;
    }
}
