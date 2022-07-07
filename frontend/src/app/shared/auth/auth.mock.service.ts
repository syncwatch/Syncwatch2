import { Injectable } from "@angular/core";
import { Observable, of, delay, tap } from "rxjs";
import { IAuthService } from "./auth.service.interface";
import { Token } from "./token";

@Injectable()
export class AuthService implements IAuthService {
    private _loggedIn = false;

    login(username: string, password: string, staySignedin: boolean): Observable<Token> {
        return of({
            msg: 'success',
            expires: 0,
            session_token: '123',
        }).pipe(
            delay(500),
            tap(() => {
                if (username === 'asd') throw new Error('wrong username');
                this._loggedIn = true;
            })
        );
    }

    logout(): Observable<any> {
        return of({
            msg: 'success'
        }).pipe(
            delay(500),
            tap(() => {
                this._loggedIn = false;
                if (Math.random() > 0.5) throw new Error('random logout error');
            })
        );
    }

    isLoggedIn(): boolean {
        return this._loggedIn;
    }

    getSessionToken(): string {
        return "123";
    }

    unload(): void {
    }
}
