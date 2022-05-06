import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Component({
    selector: 'app-downloads',
    templateUrl: './downloads.component.html',
    styleUrls: ['./downloads.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadsComponent implements OnInit {

    storageSupported = true;
    storageQuota: string = "";
    storageUsage: string = "";

    constructor(private ref: ChangeDetectorRef, private storageService: StorageService) { }

    ngOnInit(): void {
        this.storageService.getIndexedDBEstimateReadable().then(est => {
            this.storageQuota = est.quota;
            this.storageUsage = est.usage;
            this.ref.detectChanges();
        }).catch(err => {
            this.storageSupported = false;
            this.ref.detectChanges();
        });
    }

}
