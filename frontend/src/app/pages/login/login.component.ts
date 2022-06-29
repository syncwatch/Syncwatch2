import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { SyncService } from 'src/app/shared/sync/sync.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorMessage: string = "";
    loading = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        public syncService: SyncService,
        private ref: ChangeDetectorRef,
    ) {

        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            staySignedin: new FormControl(false),
        });
    }

    get username(): FormControl {
        return <FormControl>this.loginForm.get('username');
    }

    get password(): FormControl {
        return <FormControl>this.loginForm.get('password');
    }

    ngOnInit(): void {
        if (this.authService.isLoggedIn() || !this.syncService.isOnline()) this.router.navigate(['home']);
    }

    useOffline() {
        this.syncService.setVoluntaryOffline(true);
        this.router.navigate(['home']);
    }

    login() {
        this.loginForm.markAllAsTouched();
        const val = this.loginForm.value;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        this.authService.login(val.username, val.password, val.staySignedin).subscribe({
            next: () => {
                this.router.navigate(['home']);
            },
            error: (err) => {
                if (err && err.error && err.error.detail) {
                    this.errorMessage = err.error.detail;
                } else {
                    this.errorMessage = 'Unknown Error';
                }
                this.loading = false;
                this.ref.detectChanges();
            },
        });
    }
}
