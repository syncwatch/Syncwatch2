import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { api_endpoints } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Session } from './session';
import { IUserService } from './user.service.interface';

@Injectable()
export class UserService implements IUserService {

    constructor(private http: HttpClient, private authService: AuthService) {}

    sessions(): Observable<Session[]> {
        return this.http.get<{ sessions: Session[] }>(api_endpoints.SESSIONS_URL, {
            headers: {
                'Authorization': this.authService.getSessionToken()
            }
        }).pipe(
            map(data => data.sessions)
        );
    }

    deleteSessions(): Observable<any> {
        return this.http.post<any>(api_endpoints.DELETE_SESSIONS_URL, {}, {
            headers: {
                'Authorization': this.authService.getSessionToken()
            }
        }).pipe(
            tap(() => this.authService.clearStorage())
        );
    }

    deleteSessionById(id: number, delete_after: boolean): Observable<any> {
        let obs = this.http.post<any>(api_endpoints.DELETE_SESSIONS_URL, {
            session_id: id
        }, {
            headers: {
                'Authorization': this.authService.getSessionToken()
            }
        });
        if (delete_after) obs = obs.pipe(
            tap(() => this.authService.clearStorage())
        );
        return obs;
    }
}
