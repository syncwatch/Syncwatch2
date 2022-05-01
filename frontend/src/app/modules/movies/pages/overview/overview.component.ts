import { Component, OnDestroy, OnInit } from '@angular/core';
import { DisplayService } from 'src/app/shared/display/display.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

    constructor(private displayService: DisplayService) { }

    ngOnInit(): void {
        this.displayService.requestFullscreenMobile();
    }

    ngOnDestroy(): void {
        this.displayService.exitFullscreen();
    }
}
