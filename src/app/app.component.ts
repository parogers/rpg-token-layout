import { Component, ViewChildren } from '@angular/core';

import { DEMO_IMAGES } from './demo';

interface Piece {
    imageURL: string;
    size: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // @ViewChildren('piece')
    // pieceElements: any;

    pieces: Piece[] = [
        {
            imageURL: DEMO_IMAGES[0],
            size: 'medium',
        },
        {
            imageURL: DEMO_IMAGES[1],
            size: 'large',
        },
        {
            imageURL: DEMO_IMAGES[2],
            size: 'medium',
        },
    ];

    // images: any = DEMO_IMAGES.concat(DEMO_IMAGES).concat(DEMO_IMAGES).concat(DEMO_IMAGES).concat(DEMO_IMAGES).concat(DEMO_IMAGES).concat(DEMO_IMAGES);

    ngAfterViewInit() {
        // this.pieceElements.changes.subscribe(() => {
        //     console.log(this.pieceElements);
        // });
    }

    onChange(input: any) {
        const files = <File[]>input.files;
        if (!files) {
            return;
        }
        this.pieces = Array.from(files).map((file: File) => {
            const image = URL.createObjectURL(file);
            return {
                imageURL: image,
                size: 'medium',
            };
        });
    }
}
