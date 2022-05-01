import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SyncService } from './sync.service';

@Injectable({
  providedIn: 'root'
})
export class OnlineGuardService implements CanActivate {
    constructor(private syncService: SyncService, private router: Router) {
    }

    canActivate(): boolean | UrlTree {
        return this.syncService.isOnline() || this.router.createUrlTree(['home']);
    }
}
