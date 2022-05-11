import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { SyncService } from 'src/app/shared/sync/sync.service';
import { Session } from 'src/app/shared/user/session';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    logoutLoading = false;

    device_sessions$!: Observable<Session[]>;

    constructor(
        private userService: UserService,
        private router: Router,
        public syncService: SyncService,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.device_sessions$ = this.userService.sessions();
    }

    deleteSessions() {
        this.device_sessions$ = this.userService.deleteSessions().pipe(
            tap(() => this.router.navigate(['login'])),
        );
    }

    deleteSessionById(id: number, is_current: boolean) {
        if (is_current) {
            this.device_sessions$ = this.userService.deleteSessionById(id, is_current).pipe(
                tap(() => this.router.navigate(['login'])),
            );
            return;
        }
        this.device_sessions$ = this.userService.deleteSessionById(id, is_current).pipe(
            switchMap(() => this.userService.sessions())
        );
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

    goOnline() {
        this.syncService.setVoluntaryOffline(false);
        this.router.navigate(['login']);
    }
}
