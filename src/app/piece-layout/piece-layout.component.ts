import { Component, Input } from '@angular/core';

import { Piece } from '../piece';

@Component({
    selector: 'app-piece-layout',
    templateUrl: './piece-layout.component.html',
    styleUrls: ['./piece-layout.component.scss']
})
export class PieceLayoutComponent {
    @Input()
    pieces: Piece[] = [];
}
