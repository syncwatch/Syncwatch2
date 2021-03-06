import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { SyncService } from 'src/app/shared/sync/sync.service';

@Component({
    selector: 'app-logout-button',
    templateUrl: './logout-button.component.html',
    styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {
    logoutLoading = false;

    constructor(
        public syncService: SyncService,
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit(): void {
    }

    logout() {
        this.logoutLoading = true;
        this.authService.logout().subscribe({
            next: () => {
                this.logoutLoading = false;
                this.router.navigate(['login']);
            },
            error: (err) => {
                this.logoutLoading = false;
                this.router.navigate(['login']);
            },
        });
    }

    goOnline() {
        this.syncService.setVoluntaryOffline(false);
        this.router.navigate(['login']);
    }
}
