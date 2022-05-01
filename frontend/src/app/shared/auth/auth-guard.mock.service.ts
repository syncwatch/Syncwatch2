import { Injectable } from '@angular/core';
import { CanActivate, } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService) {
    }

    canActivate(): Observable<boolean> | boolean {
        if (!this.authService.isLoggedIn()) {
            return this.authService.login("test", "test", false).pipe(map(() => true));
        }
        return true;
    }
}
