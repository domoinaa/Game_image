import { Helper } from "./Helper";

export class Images {
    constructor(imagesCropped) {
        this.imagesCropped = imagesCropped;
        this.rotation = 0;
    }

    shuffle() {
        this.imagesCropped = Helper.shuffleImages(this.imagesCropped);
    }

    getImagesCropped() {
        return this.imagesCropped;
    }

    setImagesCropped(imagesCropped) {
        this.imagesCropped = imagesCropped;
    }

    permute(position1, position2) {
        this.imagesCropped[position1.indexRow][
            position1.indexCol
        ].setCurrentPosition({ ...position2 });
        this.imagesCropped[position2.indexRow][
            position2.indexCol
        ].setCurrentPosition({ ...position1 });
        const temp = this.imagesCropped[position1.indexRow][position1.indexCol];
        this.imagesCropped[position1.indexRow][position1.indexCol] =
            this.imagesCropped[position2.indexRow][position2.indexCol];
        this.imagesCropped[position2.indexRow][position2.indexCol] = temp;
    }

    setCurrentPosition({ indexCol, indexRow, newPosition }) {
        this.imagesCropped[indexRow][indexCol].setCurrentPosition(newPosition);
    }

    getRotation() {
        return this.rotation;
    }

    setRotation(angle) {
        this.rotation = angle;
    }

    rotate90Degrees() {
        this.imagesCropped = Helper.rotate90Degrees(this.imagesCropped);
    }

    rotateMinus90Degrees() {
        this.imagesCropped = Helper.rotateMinus90Degrees(this.imagesCropped);
    }

    rotate180Degrees() {
        this.imagesCropped = Helper.rotate180Degrees(this.imagesCropped);
    }

    rotate45Degrees() {
        this.imagesCropped = Helper.rotate45Degrees(this.imagesCropped);
    }

    rotateMinus180Degrees() {
        this.imagesCropped = Helper.rotateMinus180Degrees(this.imagesCropped);
    }

    rotateMinus45Degrees() {
        this.imagesCropped = Helper.rotateMinus45Degrees(this.imagesCropped);
    }
}
