import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { Session } from './session';
import { IUserService } from './user.service.interface';

@Injectable()
export class UserService implements IUserService {
    _sessions = [
        {
            id: 1,
            device_info: 'My Device',
            is_current: false,
        },
        {
            id: 2,
            device_info: 'Your Device',
            is_current: false,
        }
    ]

    constructor() { }

    sessions(): Observable<Session[]> {
        return of(this._sessions).pipe(
            delay(500)
        );
    }

    deleteSessions(): Observable<any> {
        return of({
            msg: 'success'
        }).pipe(
            delay(500),
            tap(() => this._sessions = [])
        );
    }

    deleteSessionById(id: number, delete_after: boolean): Observable<any> {
        return of({
            msg: 'success'
        }).pipe(
            delay(500),
            tap(() => this._sessions = this._sessions.filter((value) => value.id != id)),
        );
    }
}
