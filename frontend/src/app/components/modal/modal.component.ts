import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
    _bodyHtml = '';
    _title = '';
    _buttons: Array<Button> = [];

    onClose = new EventEmitter<any>();

    @ViewChild('modalContent')
    modalContent!: ElementRef;

    constructor(private modalService: NgbModal) { }

    ngOnInit(): void {
    }

    open(bodyHtml: string, title: string = 'Modal Title', buttons: Array<Button>): Promise<any> {
        this._bodyHtml = bodyHtml;
        this._title = title;
        this._buttons = buttons;
        return this.modalService.open(this.modalContent, { ariaLabelledBy: 'modal-basic-title' }).result;
    }
}

export interface Button {
    class: string,
    innerHtml: string,
    result: string
}
