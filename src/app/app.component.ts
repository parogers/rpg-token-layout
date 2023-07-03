import { Component, ViewChildren, ViewChild } from '@angular/core';

import { PieceType, Piece, sortedBySize, PIECE_SIZES } from './piece';

import { PieceLayoutComponent } from './piece-layout/piece-layout.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild(PieceLayoutComponent)
    pieceLayoutComponent: any;

    pieces: Piece[] = [];
    //     {
    //         fileName: 'test',
    //         imageURL: 'https://unsplash.it/300/600',
    //         size: 'medium',
    //         type: PieceType.Box,
    //     },
    //     {
    //         fileName: 'test',
    //         imageURL: 'https://unsplash.it/300/300',
    //         size: 'medium',
    //         type: PieceType.Stand,
    //     },
    //     {
    //         fileName: 'test',
    //         imageURL: 'https://unsplash.it/301/600',
    //         size: 'medium',
    //         type: PieceType.Block,
    //     },
    // ];

    sizes = PIECE_SIZES;

    types = [
        PieceType.Stand,
        PieceType.Flat,
        PieceType.Box,
        PieceType.Block,
    ];

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
                type: PieceType.Stand,
            };
        });
        this.onReorder();
    }

    onSelectAll() {
        this.pieceLayoutComponent.selectAll();
    }

    onSelectNone() {
        this.pieceLayoutComponent.selectNone();
    }

    onChangeSize(size: string) {
        for (let piece of this.pieceLayoutComponent.selectedPieces) {
            piece.size = size;
        }
        // this.onSelectNone();
    }

    get hasSelection(): boolean {
        return this.pieceLayoutComponent && this.pieceLayoutComponent.hasSelected;
    }

    onReorder() {
        this.pieces = sortedBySize(this.pieces);
    }

    onDuplicate() {
        for (let piece of this.pieceLayoutComponent.selectedPieces) {
            const index = this.pieces.indexOf(piece);
            this.pieces.splice(index, 0, {
                fileName: piece.fileName,
                imageURL: piece.imageURL,
                size: piece.size,
                type: piece.type,
            });
        }
    }

    onChangeType(type: PieceType) {
        for (let piece of this.pieceLayoutComponent.selectedPieces) {
            piece.type = type;
        }
    }
}
