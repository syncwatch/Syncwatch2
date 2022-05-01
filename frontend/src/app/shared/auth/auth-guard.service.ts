import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(): boolean | UrlTree {
        return this.authService.isLoggedIn() || this.router.createUrlTree(['login']);
    }
}
