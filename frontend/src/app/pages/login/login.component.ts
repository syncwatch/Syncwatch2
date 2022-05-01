import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { SyncService } from 'src/app/shared/sync/sync.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorMessage: string = "";
    loading = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        public syncService: SyncService
    ) {

        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            stay_signedin: new FormControl(false),
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

    login() {
        this.loginForm.markAllAsTouched();
        const val = this.loginForm.value;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        this.authService.login(val.username, val.password, val.stay_signedin)
            .pipe(
                catchError(err => {
                    this.errorMessage = err.error.description;
                    this.loading = false;
                    return throwError(() => err);
                })
            ).subscribe(() => {
                    this.router.navigate(['home']);
            });
    }
}
