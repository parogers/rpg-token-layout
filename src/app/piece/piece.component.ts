import { Component, Input } from '@angular/core';

import { PieceRef } from '../piece';

@Component({
    selector: 'app-piece',
    templateUrl: './piece.component.html',
    styleUrls: ['./piece.component.scss']
})
export class PieceComponent {
    @Input()
    piece: PieceRef = null;
}
