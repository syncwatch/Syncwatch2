import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { Session } from 'src/app/shared/user/session';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    device_sessions$!: Observable<Session[]>;

    constructor(private userService: UserService, private router: Router) { }

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

}
