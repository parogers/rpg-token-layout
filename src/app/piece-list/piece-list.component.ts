
import { Component, ElementRef, Input, ViewChildren } from '@angular/core';

import { Piece } from '../piece';

@Component({
    selector: 'app-piece-list',
    templateUrl: './piece-list.component.html',
    styleUrls: ['./piece-list.component.scss']
})
export class PieceListComponent {
    @ViewChildren('checkbox')
    checkboxes: any;

    @Input()
    pieces: Piece[] = [];

    isSelected(piece: Piece) {
        const index = this.pieces.indexOf(piece);
        if (index !== -1) {
            const el = this.checkboxes.get(index);
            return el.nativeElement.checked;
        }
    }

    selectAll() {
        for (let checkbox of this.checkboxes) {
            checkbox.nativeElement.checked = true;
        }
    }

    selectNone() {
        for (let checkbox of this.checkboxes) {
            checkbox.nativeElement.checked = undefined;
        }
    }
}
