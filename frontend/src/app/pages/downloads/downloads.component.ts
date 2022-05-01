import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Component({
    selector: 'app-downloads',
    templateUrl: './downloads.component.html',
    styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {

    storageSupported = true;
    storageQuota: string = "";
    storageUsage: string = "";

    constructor(private storageService: StorageService) { }

    ngOnInit(): void {
        this.storageService.getStorageEstimateReadable().then(est => {
            this.storageQuota = est.quota;
            this.storageUsage = est.usage;
        }).catch(err => {
            this.storageSupported = false;
        });
    }

}
