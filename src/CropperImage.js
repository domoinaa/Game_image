import Image from "image-js";
import { CellImage } from "./CellImage";

export class CropperImage {
    constructor(imageSrc) {
        this.imageSrc = imageSrc;
        this.marginErrorSize = 2;
    }

    crop = async ({ rows, cols }) => {
        const image = await Image.load(this.imageSrc);
        const cellWidth = image.width / cols - this.marginErrorSize;
        const cellHeight = image.height / rows - this.marginErrorSize;
        const imagesCropped = [];

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cropped = image.crop({
                    x: j * cellWidth,
                    y: i * cellHeight,
                    width: cellWidth,
                    height: cellHeight,
                });

                const cellImage = new CellImage(cropped.toDataURL(), j, i);
                if (imagesCropped[i]) imagesCropped[i].push(cellImage);
                else imagesCropped[i] = [cellImage];
            }
        }

        return imagesCropped;
    };
}
