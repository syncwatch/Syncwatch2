import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { DisplayService } from './display.service';

@Injectable()
export class FullscreenGuardService implements CanActivate {

    constructor(private displayService: DisplayService) { }

    canActivate(): boolean {
        this.displayService.requestFullscreenMobile();
        return true;
    }
}
