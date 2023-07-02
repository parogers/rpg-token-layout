
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

    sizes: string[] = ['small', 'medium', 'large'];

    isSelected(piece: Piece) {
        const index = this.pieces.indexOf(piece);
        if (index !== -1) {
            const el = this.checkboxes.get(index);
            return el.nativeElement.checked;
        }
    }

    onChangeSize(size: string) {
        for (let piece of this.pieces) {
            if (this.isSelected(piece)) {
                piece.size = size;
            }
        }
        this.onSelectNone();
    }

    onSelectAll() {
        for (let checkbox of this.checkboxes) {
            checkbox.nativeElement.checked = true;
        }
    }

    onSelectNone() {
        for (let checkbox of this.checkboxes) {
            checkbox.nativeElement.checked = undefined;
        }
    }
}
