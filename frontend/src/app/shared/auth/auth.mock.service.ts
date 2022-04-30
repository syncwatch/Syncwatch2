import { Injectable } from "@angular/core";
import { Observable, of, delay, tap } from "rxjs";
import { IAuthService } from "./auth.service.interface";
import { Token } from "./token";

@Injectable()
export class AuthService implements IAuthService {
    private _loggedIn = false;

    login(username: string, password: string, stay_signedin: boolean): Observable<Token> {
        return of({
            msg: 'success',
            expires: 0,
            session_token: '123',
        }).pipe(
            delay(500),
            tap(() => {this._loggedIn = true})
        );
    }

    logout(): Observable<any> {
        return of({
            msg: 'success'
        }).pipe(
            delay(500),
            tap(() => {this._loggedIn = false})
        );
    }

    isLoggedIn(): boolean {
        return this._loggedIn;
    }

    unload(): void {
    }
}
