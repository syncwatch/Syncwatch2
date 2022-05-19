import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar-desktop',
    templateUrl: './navbar-desktop.component.html',
    styleUrls: ['./navbar-desktop.component.scss']
})
export class NavbarDesktopComponent implements OnInit {

    isCollapsed = true;

    @Input()
    navStartRoutes: { path: string, title: string }[] = [];

    @Input()
    navEndRoutes: { path: string, title: string }[] = [];

    constructor() { }

    ngOnInit(): void {
    }
}
