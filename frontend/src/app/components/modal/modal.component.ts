import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

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

    onClose = new EventEmitter<any>();

    @ViewChild('modalContent')
    modalContent!: ElementRef;

    constructor() { }

    ngOnInit(): void {
    }

    open(bodyHtml: string, title: string = 'Modal Title', buttons: Button[]): Promise<any> {
        this._bodyHtml = bodyHtml;
        this._title = title;
        this._buttons = buttons;
        return new Promise(() => {});
        // return this.modalService.open(this.modalContent, { ariaLabelledBy: 'modal-basic-title' }).result;
    }
}

export interface Button {
    class: string,
    innerHtml: string,
    result: string
}
