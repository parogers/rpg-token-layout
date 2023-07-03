import { Component, Input, SimpleChanges } from '@angular/core';

import { Piece } from '../piece';

@Component({
    selector: 'app-piece-layout',
    templateUrl: './piece-layout.component.html',
    styleUrls: ['./piece-layout.component.scss']
})
export class PieceLayoutComponent {
    @Input()
    pieces: Piece[] = [];

    selected: { [index: string]: boolean } = {};

    get hasSelected(): boolean {
        // TODO - cache
        return Object.keys(this.selected).length > 0;
    }

    get selectedPieces(): Piece[] {
        return Object.keys(this.selected).filter((index) => {
            return !!this.selected[index];
        }).map((index) => {
            return this.pieces[+index];
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['pieces']) {
            this.selectNone();
        }
    }

    selectAll() {
        this.selected = Object.fromEntries(this.pieces.map((piece, index) => {
            return [index, true];
        }));
    }

    selectNone() {
        this.selected = {};
    }

    isSelected(piece: Piece): boolean {
        const index = this.pieces.indexOf(piece);
        return !!this.selected[index];
    }

    onClick(piece: Piece) {
        const index = this.pieces.indexOf(piece);
        this.selected[index] = !this.selected[index];
    }
}
