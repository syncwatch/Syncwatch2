import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap, tap, } from 'rxjs';
import { Session } from 'src/app/shared/user/session';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    logoutLoading = false;

    deviceSessions$!: Observable<Session[]>;

    constructor(
        private userService: UserService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.deviceSessions$ = this.userService.sessions();
    }

    deleteSessions() {
        this.deviceSessions$ = this.userService.deleteSessions().pipe(
            tap(() => this.router.navigate(['login'])),
        );
    }

    deleteSessionById(id: number, is_current: boolean) {
        if (is_current) {
            this.deviceSessions$ = this.userService.deleteSessionById(id, is_current).pipe(
                tap(() => this.router.navigate(['login'])),
            );
            return;
        }
        this.deviceSessions$ = this.userService.deleteSessionById(id, is_current).pipe(
            switchMap(() => this.userService.sessions())
        );
    }
}
