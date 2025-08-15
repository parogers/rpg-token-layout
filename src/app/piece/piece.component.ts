import { Component, Input, ElementRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { PieceRef, PieceType } from '../piece';

@Component({
    selector: 'app-piece',
    templateUrl: './piece.component.html',
    styleUrls: ['./piece.component.scss'],
    imports: [CommonModule],
})
export class PieceComponent {
    @Input()
    piece: PieceRef = null;

    constructor(private elementRef: ElementRef) {}

    get isInsertType(): boolean {
        return !!(this.piece && this.piece.type == PieceType.Insert);
    }

    get isStandType(): boolean {
        return !!(this.piece && this.piece.type === PieceType.Stand);
    }

    get isFlatType(): boolean {
        return !!(this.piece && this.piece.type === PieceType.Flat);
    }

    get isBlockType(): boolean {
        return !!(this.piece && this.piece.type === PieceType.Block);
    }

    onImageLoad() {
        const maxHeight = 8*96;
        const rect = this.elementRef.nativeElement.getBoundingClientRect();
        if (rect.height > maxHeight) {
            console.log('piece is too tall');
        }
        console.log(rect.height);
    }
}
