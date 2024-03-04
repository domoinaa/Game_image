import { Result } from "./Result";

export class GameController {
    constructor(validator, images) {
        this.validator = validator;
        this.images = images;
        this.activeImageClicked = null;
        this.gameOver = false;
        this.startGame = false;
        this.counterClick = 0;

        validator.subscribeOnGameOver(this.onGameOver);
    }

    onImageClick = (cellImage, cellHTML) => {
        if (!this.startGame) return;
        const imagesCropped = this.images.getImagesCropped();
        if (this.gameOver) return Result.winner(this.counterClick);
        if (this.activeImageClicked === null) {
            cellHTML.classList.add("active");
            this.activeImageClicked = {
                index: cellImage.getCurrentPosition(),
                html: cellHTML,
            };
            return;
        }
        if (!cellImage.isSameAsCurrentPosition(this.activeImageClicked.index)) {
            this.incrementCounter();
            const { indexCol, indexRow } = this.activeImageClicked.index;

            const activeCellImage = imagesCropped[indexRow][indexCol];
            const tmpCellImagePosition = cellImage.getCurrentPosition();
            const tmpActiveImagePosition = activeCellImage.getCurrentPosition();
            const cellLastPositionValid = cellImage.isValid();
            const activeLastPositionValid = activeCellImage.isValid();

            this.images.permute(
                this.activeImageClicked.index,
                cellImage.getCurrentPosition()
            );

            this.validator.movedCellImage(
                cellLastPositionValid,
                tmpActiveImagePosition
            );
            this.validator.movedCellImage(
                activeLastPositionValid,
                tmpCellImagePosition
            );

            const tmpCellHtmlSrc = cellHTML.src;
            cellHTML.src = this.activeImageClicked.html.src;
            this.activeImageClicked.html.src = tmpCellHtmlSrc;
        }

        this.activeImageClicked.html.classList.remove("active");
        this.activeImageClicked = null;
    };

    onGameOver = () => {
        this.gameOver = true;
        Result.winner(this.counterClick);
    };

    incrementCounter = () => {
        this.counterClick++;
    };

    setStartGame() {
        this.startGame = true;
    }
}
