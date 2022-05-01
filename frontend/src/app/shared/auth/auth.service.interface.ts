import { Observable } from "rxjs";
import { Token } from "./token";

export interface IAuthService {

    login(username: string, password: string, stay_signedin: boolean): Observable<Token>;

    logout(): Observable<any>;

    isLoggedIn(): boolean;

    getSessionToken(): string;

    unload(): void;
}
