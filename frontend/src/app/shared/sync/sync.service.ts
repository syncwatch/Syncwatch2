import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SyncService {
    constructor() {
    }

    isOnline(): boolean {
        return navigator.onLine;
    }
}
