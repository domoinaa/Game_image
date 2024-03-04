import { Helper } from "./Helper";

export class CellImage {
    constructor(imageUrl, indexCol, indexRow, rotation = 0) {
        this.imageUrl = imageUrl;
        this.initialPosition = {
            indexCol,
            indexRow,
            rotation,
        };
        this.currentPosition = {
            indexCol,
            indexRow,
            rotation,
        };
    }

    getImageUrl() {
        return this.imageUrl;
    }

    getInitialPosition() {
        return this.initialPosition;
    }

    getCurrentPosition() {
        return this.currentPosition;
    }

    setInitialPosition(position) {
        this.initialPosition = position;
    }

    setCurrentPosition(position) {
        this.currentPosition = { ...this.currentPosition, ...position };
    }

    isValid() {
        return Helper.isSamePosition(
            this.currentPosition,
            this.initialPosition
        );
    }

    isSameAsInitialPosition(position) {
        return Helper.isSamePosition(position, this.initialPosition);
    }

    isSameAsCurrentPosition(position) {
        return Helper.isSamePosition(position, this.currentPosition);
    }

    isSameAs(cellImage) {
        return (
            this.imageUrl == cellImage.imageUrl &&
            Helper.isSamePosition(
                this.currentPosition,
                cellImage.getCurrentPosition()
            ) &&
            Helper.isSamePosition(
                this.initialPosition,
                cellImage.initialPosition
            )
        );
    }
}
