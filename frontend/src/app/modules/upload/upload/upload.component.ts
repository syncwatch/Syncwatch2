import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, filter, Observable, switchMap } from 'rxjs';
import { UploadService } from 'src/app/shared/upload/upload.service';
import { Uploadable } from 'src/app/shared/upload/uploadable';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent implements OnInit {

    remoteUpload = false;
    searchControl!: FormControl;
    searchResults$!: Observable<Uploadable | undefined>;

    constructor(
        private uploadService: UploadService,
    ) { }

    ngOnInit(): void {
        this.searchControl = new FormControl('', [Validators.minLength(3), Validators.required]);
        this.searchResults$ = this.searchControl.valueChanges.pipe(
            filter(() => this.searchControl.valid),
            debounceTime(1000),
            switchMap(term => this.uploadService.search(this.remoteUpload, term))
        );
    }

}
