import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
    _bodyHtml = '';
    _title = '';
    _buttons: Button[] = [];
    opened = false;

    resultSubject = new Subject<string>();

    constructor(
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
    }

    open(bodyHtml: string, title: string = 'Modal Title', buttons: Button[]): Promise<string> {
        this.opened = true;
        this._bodyHtml = bodyHtml;
        this._title = title;
        this._buttons = buttons;
        this.ref.detectChanges();
        return firstValueFrom(this.resultSubject);
    }

    buttonClick(button: Button) {
        this.opened = false;
        this.resultSubject.next(button.result);
    }
}

export interface Button {
    class: string,
    innerHtml: string,
    result: string
}
