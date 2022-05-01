import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { catchError, filter, map, throwError } from 'rxjs';
import { ModalComponent } from './components/modal/modal.component';
import { AuthService } from './shared/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'syncwatch-frontend';
    isCollapsed = true;
    logoutLoading = false;

    @ViewChild('modal')
    modal!: ModalComponent;

    constructor(
        public authService: AuthService,
        private router: Router,
        private swUpdate: SwUpdate
    ) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.swUpdate.unrecoverable.subscribe(event => {
            this.modal.open(`An error occurred that we cannot recover from:</br>
                            ${event.reason}</br>Please reload the page.`,
                'An error occured',
                [
                    { class: 'btn btn-secondary', innerHtml: 'Reload', result: 'reload' }
                ]).then((result) => {
                    if (result == 'reload') window.location.reload();
                });
        });

        if (this.swUpdate.isEnabled) {
            this.swUpdate.versionUpdates.pipe(
                filter((evt: any): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
                map((evt: any) => {
                    console.info(`updating version=[${evt.currentVersion} to latestVersion=[${evt.latestVersion}]`);
                    this.modal.open(`Please update from version=[${evt.currentVersion} to latestVersion=[${evt.latestVersion}]`,
                        'Update available',
                        [
                            { class: 'btn btn-secondary', innerHtml: 'Reload', result: 'reload' }
                        ]).then((result) => {
                            if (result == 'reload') window.location.reload();
                        });
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
