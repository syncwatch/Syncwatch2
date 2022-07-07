import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar-mobile',
    templateUrl: './navbar-mobile.component.html',
    styleUrls: ['./navbar-mobile.component.scss']
})
export class NavbarMobileComponent implements OnInit {
    @Input()
    navMobileRoutes: { path: string, emoji: string }[] = [];

    constructor(
    ) { }

    ngOnInit(): void {
    }

}
