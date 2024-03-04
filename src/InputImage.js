export class InputImage {
    constructor() {
        this.currentImageSrc = null;
        this.rows = 0;
        this.cols = 0;
        this.subscribers = [];
        this.subscribersNewImage = [];
        this.subscribersCrop = [];
        this.subscribersShuffle = [];
        this.init();
    }

    init() {
        const fileInput = document.querySelector("#file-upload");
        fileInput.onchange = () => {
            const file = fileInput.files ? fileInput.files[0] : null;
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    this.currentImageSrc = reader.result;
                    if (this.currentImageSrc)
                        this.executeSubscriberNewImage(this.currentImageSrc);
                };
            }
        };
        const rowInput = document.querySelector("#row");
        rowInput.onchange = () => {
            const row = Number(rowInput.value);
            if (isNaN(row)) return;
            this.rows = row;
        };

        const colInput = document.querySelector("#col");
        colInput.onchange = () => {
            const col = Number(colInput.value);
            if (isNaN(col)) return;
            this.cols = col;
        };

        const cropButton = document.querySelector("#cropbtn");
        cropButton.onclick = () => {
            if (this.currentImageSrc && this.rows && this.cols)
                this.executeSubscriberCrop({
                    imageSrc: this.currentImageSrc,
                    cols: this.cols,
                    rows: this.rows,
                });
        };

        const shuffleButton = document.querySelector("#shufflebtn");
        shuffleButton.onclick = () => {
            if (this.currentImageSrc && this.rows && this.cols)
                this.executeSubscriberShuffle();
        };
    }

    restart() {
        this.currentImageSrc = null;
        this.rows = 0;
        this.cols = 0;
        // this.init();
    }

    onNewImage(subscriber) {
        this.subscribersNewImage.push(subscriber);
    }

    executeSubscriberNewImage(data) {
        this.subscribersNewImage.forEach((subscriber) => subscriber(data));
    }

    onCrop(subscriber) {
        this.subscribersCrop.push(subscriber);
    }

    executeSubscriberCrop(imageSrc) {
        this.subscribersCrop.forEach((subscriber) => subscriber(imageSrc));
    }

    onShuffle(subscriber) {
        this.subscribersShuffle.push(subscriber);
    }

    executeSubscriberShuffle() {
        this.subscribersShuffle.forEach((subscriber) => subscriber());
    }

    draw() {
        const inputGame = document.querySelector(".input-game");
        if (inputGame) inputGame.remove();
        const appContainer = document.querySelector("#app");
        appContainer.insertAdjacentHTML(
            "afterbegin",
            `
            <div class="input-game">
                <div class="custom-file-upload">
                    <input type="file" id="file-upload" />
                </div>
                <div class="input-row">
                    <label for="row">Ligne :</label>
                    <input type="number" id="row" class="input-size" />
                    <label for="col">Colonne :</label>
                    <input type="number" id="col" class="input-size" />
                </div>
                <button id="start">Jouer</button>
            </div>`
        );
    }
}
