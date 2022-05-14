import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Uploadable } from './uploadable';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    constructor(
        private http: HttpClient,
    ) { }

    search(remote: boolean, term: string): Observable<Uploadable | undefined> {
        if (remote) return this.search_remote(term);
        return this.search_local(term);
    }

    search_remote(term: string): Observable<Uploadable | undefined> {
        return of({title: 'test'});
    }

    search_local(term: string): Observable<Uploadable | undefined> {
        if (term.startsWith('https://comick.fun/comic/')) {
            return this.http.get(term).pipe(
                map((data) => {
                    console.log(data);
                    return undefined;
                }),
            );
        }
        return of(undefined);
    }
}
