import { Component, ViewChildren, ViewChild } from '@angular/core';

import { Piece, PIECE_SIZES } from './piece';

import { PieceListComponent } from './piece-list/piece-list.component';

function sortedBySize(pieces: Piece[]): Piece[] {
    return pieces.slice().sort((p1, p2) => {
        const index1 = PIECE_SIZES.indexOf(p1.size);
        const index2 = PIECE_SIZES.indexOf(p2.size);
        if (index1 !== index2) {
            return index2 - index1;
        }
        if (p1.fileName < p2.fileName) {
            return -1;
        }
        if (p1.fileName > p2.fileName) {
            return 1;
        }
        return 0;
    });
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild(PieceListComponent)
    pieceListComponent: any;

    pieces: Piece[] = []
    piecesSortedBySize: Piece[] = sortedBySize(this.pieces);

    sizes = PIECE_SIZES;

    onChange(input: any) {
        function getDefaultSize(file: File): string {
            for (let size of PIECE_SIZES) {
                if (file.name.indexOf(size) !== -1) {
                    return size;
                }
            }
            return 'medium';
        }

        const files = <File[]>input.files;
        if (!files) {
            return;
        }
        this.pieces = Array.from(files).map((file: File) => {
            return {
                fileName: file.name,
                imageURL: URL.createObjectURL(file),
                size: getDefaultSize(file),
            };
        });
        this.piecesSortedBySize = sortedBySize(this.pieces);
    }

    onSelectAll() {
        this.pieceListComponent.selectAll();
    }

    onSelectNone() {
        this.pieceListComponent.selectNone();
    }

    onChangeSize(size: string) {
        for (let piece of this.pieces) {
            if (this.pieceListComponent.isSelected(piece)) {
                piece.size = size;
            }
        }
        this.onSelectNone();
        this.piecesSortedBySize = sortedBySize(this.pieces);
    }
}
