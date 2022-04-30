import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './shared/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'syncwatch-frontend';
    isCollapsed = true;

    constructor(
        public authService: AuthService,
        private router: Router,
    ) {
    }

    @HostListener("window:beforeunload", ["$event"])
    unload() {
        this.authService.unload();
    }

    logout() {
        this.authService.logout().pipe(
            catchError(err => {
                this.router.navigate(['login']);
                return throwError(() => err);
            }),
        ).subscribe(() => {
            this.router.navigate(['login']);
        });
    }
}
