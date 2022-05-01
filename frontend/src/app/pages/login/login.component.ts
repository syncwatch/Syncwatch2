import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorMessage: string = "";
    loading = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {

        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            stay_signedin: new FormControl(false),
        });
    }

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) this.router.navigate(['home']);
    }

    login() {
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
