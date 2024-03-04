// import { CheckingByCounter } from "./CheckingByCounter";
import { CheckingByCounter } from "./CheckingByCounter";
import { CheckingByIteration } from "./CheckingByIteration";
import { CropperImage } from "./CropperImage";
import { Drawer } from "./Drawer";
import { GameController } from "./GameController";
import { Images } from "./Images";
import { InputImage } from "./InputImage";
import "./style.css";

async function main() {
    const inputImage = new InputImage();
    inputImage.onCrop(async ({ imageSrc, cols, rows }) => {
        const cropper = new CropperImage(imageSrc);
        const imagesCropped = await cropper.crop({ rows, cols });
        const images = new Images(imagesCropped);
        const validator = new CheckingByIteration(images, {
            rows,
            cols,
        });
        console.log(images.getImagesCropped());
        const controller = new GameController(validator, images);
        const drawer = new Drawer(images, controller);
        drawer.draw({ rows, cols, imageInitialSrc: imageSrc });
        inputImage.onShuffle(() => {
            images.shuffle();
            drawer.draw({
                rows,
                cols,
                imageInitialSrc: imageSrc,
            });
            controller.setStartGame();
            console.log(images.getImagesCropped());
        });
    });
    inputImage.onNewImage((src) => {
        Drawer.initialImage(src);
    });
}
main();
