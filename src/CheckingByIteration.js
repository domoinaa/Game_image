import { Validator } from "./Validator";

export class CheckingByIteration extends Validator {
    constructor(images, { cols, rows }) {
        super();
        this.rows = rows;
        this.cols = cols;
        this.images = images;
    }

    movedCellImage() {
        this.onGameOver();
    }

    isGameOver() {
        const imagesCropped = this.images.getImagesCropped();
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const image = imagesCropped[i][j];
                if (!image.isValid()) return false;
            }
        }
        return true;
    }
}
