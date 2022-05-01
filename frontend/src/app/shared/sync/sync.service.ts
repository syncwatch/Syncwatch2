import { Injectable } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SyncService {
    private voluntaryOffline = false;
    private networkOffline = false;
    changes = new Subject<void>();

    constructor() {
        this.networkOffline = !navigator.onLine;
        fromEvent(window, 'online').subscribe(() => {
            this.networkOffline = false;
            this.changes.next();
        });
        fromEvent(window, 'offline').subscribe(() => {
            this.networkOffline = true;
            this.changes.next();
        });
    }

    setVoluntaryOffline(offline: boolean) {
        this.voluntaryOffline = offline;
        this.changes.next();
    }

    isVoluntaryOffline(): boolean {
        return !this.networkOffline && this.voluntaryOffline;
    }

    isOffline(): boolean {
        return this.voluntaryOffline || this.networkOffline;
    }

    isOnline(): boolean {
        return !this.isOffline();
    }
}
