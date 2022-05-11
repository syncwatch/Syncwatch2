import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SyncService } from 'src/app/shared/sync/sync.service';

@Component({
    selector: 'app-navbar-desktop',
    templateUrl: './navbar-desktop.component.html',
    styleUrls: ['./navbar-desktop.component.scss']
})
export class NavbarDesktopComponent implements OnInit {

    isCollapsed = true;

    @Input()
    logoutLoading = false;

    @Input()
    navStartRoutes: {path: string, title: string}[] = [];

    @Input()
    navEndRoutes: {path: string, title: string}[] = [];

    @Output()
    onLogout = new EventEmitter<void>();

    @Output()
    onGoOnline = new EventEmitter<void>();

    constructor(
        public syncService: SyncService
    ) { }

    ngOnInit(): void {
    }
}
