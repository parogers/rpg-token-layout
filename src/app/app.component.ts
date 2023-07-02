import { Component, ViewChildren, ViewChild } from '@angular/core';

import { Piece, sortedBySize, PIECE_SIZES } from './piece';

import { PieceListComponent } from './piece-list/piece-list.component';

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

    onChange(input: any)
    {
        function getDefaultSize(file: File): string {
            for (let size of PIECE_SIZES) {
                if (file.name.indexOf(size.toUpperCase()) !== -1) {
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
