
import { Component, ViewChildren, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { HostListener } from '@angular/core';

import { PieceType, Piece, sortedBySize, PIECE_SIZES } from './piece';

import { PieceLayoutComponent } from './piece-layout/piece-layout.component';

const PIECE_TYPES = [
    PieceType.Stand,
    PieceType.Flat,
    PieceType.Block,
    PieceType.Insert,
];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, PieceLayoutComponent, FormsModule],
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
    types = PIECE_TYPES;

    currentSize: string = '';
    currentType: PieceType;

    onLoad(input: any)
    {
        function getDefaultType(file: File): PieceType {
            for (let type of PIECE_TYPES) {
                if (file.name.indexOf(type.toUpperCase()) !== -1) {
                    return type;
                }
            }
            return PieceType.Stand;
        }
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
        const newPieces = Array.from(files).map((file: File) => {
            return {
                fileName: file.name,
                imageURL: URL.createObjectURL(file),
                size: getDefaultSize(file),
                type: getDefaultType(file),
            };
        });
        this.pieces = this.pieces.concat(newPieces);
        this.onReorder();
    }

    onSelectAll() {
        this.pieceLayoutComponent.selectAll();
    }

    onSelectNone() {
        this.pieceLayoutComponent.selectNone();
    }

    onChangeSize() {
        for (let piece of this.pieceLayoutComponent.selectedPieces) {
            piece.size = this.currentSize;
        }
    }

    get hasSelection(): boolean {
        return this.pieceLayoutComponent && this.pieceLayoutComponent.hasSelected;
    }

    onReorder() {
        this.pieces = sortedBySize(this.pieces);
        this.pieceLayoutComponent.selectNone();
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

    onChangeType() {
        for (let piece of this.pieceLayoutComponent.selectedPieces) {
            piece.type = this.currentType;
        }
    }

    onRemoveSelected() {
        const selected = this.pieceLayoutComponent.selectedPieces;
        this.pieces = this.pieces.filter((piece) => {
            return !selected.includes(piece);
        });
        this.pieceLayoutComponent.selectNone();
    }

    onRemoveAll() {
        this.pieces = [];
    }

    @HostListener('document:keydown', ['$event'])
    onKey(event: KeyboardEvent) {
        if (event.key === 'Delete') {
            this.onRemoveSelected();
        } else if (event.key == 'a' && event.ctrlKey) {
            this.onSelectAll();
        }
        event.stopPropagation();
        event.preventDefault();
    }
}
