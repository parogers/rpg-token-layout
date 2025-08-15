
import { Component, Input, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';

import { PieceComponent } from '../piece/piece.component';

import { Piece } from '../piece';

@Component({
    selector: 'app-piece-layout',
    templateUrl: './piece-layout.component.html',
    styleUrls: ['./piece-layout.component.scss'],
    imports: [CommonModule, PieceComponent],
    host: {
        '(click)': 'onLayoutClick()',
    },
})
export class PieceLayoutComponent {
    @Input()
    pieces: Piece[] = [];

    lastSelectedIndex = -1;
    selected: { [index: string]: boolean } = {};

    get hasSelected(): boolean {
        // TODO - cache
        return Object.values(this.selected).some((value) => !!value);
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
        this.lastSelectedIndex = -1;
    }

    isSelected(piece: Piece): boolean {
        const index = this.pieces.indexOf(piece);
        return !!this.selected[index];
    }

    onClick(event: MouseEvent, piece: Piece) {
        const index = this.pieces.indexOf(piece);
        if (event.shiftKey) {
            // Selecting a range
            if (this.lastSelectedIndex === -1) {
                this.lastSelectedIndex = index;
            }
            const start = Math.min(index, this.lastSelectedIndex);
            const end = Math.max(index, this.lastSelectedIndex);
            for (let n = start; n <= end; n++) {
                this.selected[n] = true;
            }
        } else if (event.ctrlKey) {
            // Adding one piece to the selection
            this.selected[index] = !this.selected[index];
        } else {
            // Selecting a single piece
            this.selected = {}
            this.selected[index] = true;
        }
        this.lastSelectedIndex = index;
        event.stopPropagation();
    }

    onLayoutClick() {
        this.selectNone();
    }
}
