import { Observable } from "rxjs";
import { Session } from "./session";

export interface IUserService {
    sessions(): Observable<Session[]>;

    deleteSessions(): Observable<any>;

    deleteSessionById(id: number, delete_after: boolean): Observable<any>;
}
