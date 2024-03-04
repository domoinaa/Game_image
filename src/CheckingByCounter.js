import { Validator } from "./Validator";

export class CheckingByCounter extends Validator {
    constructor(images, { cols, rows }) {
        super();
        this.images = images;
        this.currentValid = 0;
        this.validTotal = 0;
        const imagesCropped = this.images.getImagesCropped();
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const image = imagesCropped[i][j];
                if (image.isValid()) this.currentValid++;
                this.validTotal++;
            }
        }
        // this.onGameOver();
    }

    movedCellImage(isLastPositionValid, to) {
        const imagesCropped = this.images.getImagesCropped();
        if (isLastPositionValid) this.currentValid--;

        if (imagesCropped[to.indexRow][to.indexCol].isValid())
            this.currentValid++;

        this.onGameOver();
    }

    isGameOver() {
        const gameOver = this.validTotal == this.currentValid;
        return gameOver;
    }
}
