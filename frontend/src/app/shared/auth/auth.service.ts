import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { api_endpoints } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Token } from './token';
import { IAuthService } from './auth.service.interface';
import { SyncService } from '../sync/sync.service';

@Injectable()
export class AuthService implements IAuthService {
    constructor(private http: HttpClient, private syncService: SyncService) {
    }

    private getStorage(): Storage {
        return localStorage;
    }

    login(username: string, password: string, staySignedin: boolean): Observable<Token> {
        return this.http.post<Token>(api_endpoints.LOGIN_URL, { username, password }).pipe(
            tap((res: Token) => this.setSession(res, staySignedin)),
        );
    }

    logout(): Observable<any> {
        return this.http.post(
            api_endpoints.LOGOUT_URL,
            {},
            {
                headers: {
                    'Authorization': this.getSessionToken()
                }
            }).pipe(
                catchError(err => {
                    this.clearStorage();
                    throw err;
                }),
                tap(() => this.clearStorage()),
            );
    }

    isLoggedIn(): boolean {
        if (!this.syncService.isOnline()) return true;
        return this.isOnlineLoggedIn();
    }

    isOnlineLoggedIn(): boolean {
        const exp = this.getExpiration();
        if (exp === undefined) return false;
        return exp === -1 || Math.floor(new Date().getTime() / 1000) < exp;
    }

    private setSession(authResult: Token, staySignedin: boolean) {
        localStorage.setItem('staySignedin', (staySignedin ? '1' : '0'));
        this.getStorage().setItem('session_token', authResult.session_token);
        this.getStorage().setItem('session_expires', JSON.stringify(authResult.expires));
    }

    private getExpiration(): number | undefined {
        const expiration = this.getStorage().getItem("session_expires");
        if (expiration === null) return;
        return JSON.parse(expiration);
    }

    private getStaySignedin(): boolean {
        const staySignedin = localStorage.getItem("staySignedin");
        return staySignedin === '1';
    }

    getSessionToken(): string {
        const session_token = this.getStorage().getItem("session_token");
        if (session_token === null) return '';
        return session_token;
    }

    unload(): void {
        if (this.getStaySignedin() || !this.isOnlineLoggedIn()) return;
        this.logout().subscribe();
    }

    clearStorage() {
        this.getStorage().removeItem('session_token');
        this.getStorage().removeItem('session_expires');
        localStorage.removeItem("staySignedin");
    }
}
