import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { catchError, filter, map, throwError } from 'rxjs';
import { AuthService } from './shared/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'syncwatch-frontend';
    isCollapsed = true;
    logoutLoading = false;

    constructor(
        public authService: AuthService,
        private router: Router,
        private swUpdate: SwUpdate
    ) {
    }
    ngOnInit(): void {
        if (this.swUpdate.isEnabled) {
            this.swUpdate.versionUpdates.pipe(
                filter((evt: any): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
                map((evt: any) => {
                    console.info(`updating version=[${evt.currentVersion} to latestVersion=[${evt.latestVersion}]`);
                    window.location.reload();
                }),
            );
        }
    }

    @HostListener("window:beforeunload", ["$event"])
    unload() {
        this.authService.unload();
    }

    logout() {
        this.logoutLoading = true;
        this.authService.logout().pipe(
            catchError(err => {
                this.router.navigate(['login']);
                this.logoutLoading = false;
                return throwError(() => err);
            }),
        ).subscribe(() => {
            this.logoutLoading = false;
            this.router.navigate(['login']);
        });
    }
}
