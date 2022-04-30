import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Token } from './token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {
    }

    private getStorage(): Storage {
        return localStorage;
    }

    login(username: string, password: string, stay_signedin: boolean): Observable<Token> {
        return this.http.post<Token>(environment.api_base_url + '/login', { username, password }).pipe(
            tap((res: Token) => this.setSession(res, stay_signedin)),
            shareReplay()
        );
    }

    logout(): Observable<any> {
        return this.http.post(
            environment.api_base_url + '/logout',
            {},
            {
                headers: {
                    'Authorization': this.getSessionToken()
                }
            }).pipe(
                catchError(err => {
                    this.clearStorage();
                    return throwError(() => err);
                }),
                tap(() => this.clearStorage()),
                shareReplay()
            );
    }

    isLoggedIn(): boolean {
        const exp = this.getExpiration();
        if (exp === undefined) return false;
        return exp === -1 || Math.floor(new Date().getTime() / 1000) < exp;
    }

    private setSession(authResult: Token, stay_signedin: boolean) {
        console.log(authResult);
        localStorage.setItem('stay_signedin', (stay_signedin ? '1' : '0'));
        this.getStorage().setItem('session_token', authResult.session_token);
        this.getStorage().setItem('session_expires', JSON.stringify(authResult.expires));
    }

    private getExpiration(): number | undefined {
        const expiration = this.getStorage().getItem("session_expires");
        if (expiration === null) return;
        return JSON.parse(expiration);
    }

    private getStaySignedin(): boolean {
        const stay_signedin = localStorage.getItem("stay_signedin");
        return stay_signedin === '1';
    }

    private getSessionToken(): string {
        const session_token = this.getStorage().getItem("session_token");
        if (session_token === null) return '';
        return session_token;
    }

    unload() {
        if (this.getStaySignedin()) return;
        this.logout().subscribe(() => console.log('outlogged'));
        this.clearStorage();
    }

    private clearStorage() {
        this.getStorage().removeItem('session_token');
        this.getStorage().removeItem('session_expires');
        localStorage.removeItem("stay_signedin");
    }
}
