import { Component, ViewChildren, ViewChild } from '@angular/core';

import { Piece, sortedBySize, PIECE_SIZES } from './piece';

import { PieceLayoutComponent } from './piece-layout/piece-layout.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild(PieceLayoutComponent)
    pieceLayoutComponent: any;

    pieces: Piece[] = []

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
    }

    onSelectAll() {
        this.pieceLayoutComponent.selectAll();
    }

    onSelectNone() {
        this.pieceLayoutComponent.selectNone();
    }

    onChangeSize(size: string) {
        for (let piece of this.pieces) {
            if (this.pieceLayoutComponent.isSelected(piece)) {
                piece.size = size;
            }
        }
        this.onSelectNone();
    }

    get hasSelection(): boolean {
        return this.pieceLayoutComponent && this.pieceLayoutComponent.hasSelected;
    }

    onReorder() {
        this.pieces = sortedBySize(this.pieces);
    }
}
