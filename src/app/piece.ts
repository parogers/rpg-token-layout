
export enum PieceType {
    Stand='stand',
    Flat='flat',
    Box='box',
    Block='block',
}

export interface Piece {
    fileName: string;
    imageURL: string;
    size: string;
    type: PieceType;
}

export type PieceRef = Piece | null;

export const PIECE_SIZES: string[] = ['small', 'medium', 'large'];

export function sortedBySize(pieces: Piece[]): Piece[] {
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
