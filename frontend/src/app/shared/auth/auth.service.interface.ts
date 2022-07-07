import { Observable } from "rxjs";
import { Token } from "./token";

export interface IAuthService {

    login(username: string, password: string, staySignedin: boolean): Observable<Token>;

    logout(): Observable<any>;

    isLoggedIn(): boolean;

    getSessionToken(): string;

    unload(): void;
}
