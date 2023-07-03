import { Component, Input } from '@angular/core';

import { PieceRef, PieceType } from '../piece';

@Component({
    selector: 'app-piece',
    templateUrl: './piece.component.html',
    styleUrls: ['./piece.component.scss']
})
export class PieceComponent {
    @Input()
    piece: PieceRef = null;

    get isStandType(): boolean {
        return !!(this.piece && this.piece.type === PieceType.Stand);
    }

    get isFlatType(): boolean {
        return !!(this.piece && this.piece.type === PieceType.Flat);
    }

    get isBlockType(): boolean {
        return !!(this.piece && this.piece.type === PieceType.Block);
    }

    get isBoxType(): boolean {
        return !!(this.piece && this.piece.type === PieceType.Box);
    }
}
