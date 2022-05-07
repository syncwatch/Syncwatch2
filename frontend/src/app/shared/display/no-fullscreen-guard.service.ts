import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { DisplayService } from './display.service';

@Injectable({
  providedIn: 'root'
})
export class NoFullscreenGuardService implements CanActivate {

    constructor(private displayService: DisplayService) { }

    canActivate(): boolean {
        this.displayService.exitFullscreenWithCheck();
        return true;
    }
}
