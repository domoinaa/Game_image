export class Drawer {
    constructor(images, controller) {
        this.images = images;
        this.controller = controller;
        this.CELL_MIN_WIDTH = 100;
        this.CELL_MIN_HEIGHT = 100;
        this.GAP = 6;
        this.angle = 0;
    }

    draw({ cols, rows, imageInitialSrc, shuffle = false }) {
        const imagesCropped = this.images.getImagesCropped();
        console.log(imagesCropped);
        const imagesContainer = document.querySelector(".images");
        imagesContainer.innerHTML = "";
        this.adjustCellSize({ cols, rows });

        // if (shuffle) {
        //     const angles = [90, -90, 180];
        //     const randomIndex = Math.floor(Math.random() * 3);
        //     const currentAngle = angles[randomIndex];
        //     this.angle = currentAngle;
        // }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const image = imagesCropped[i][j];
                const img = document.createElement("img");
                img.classList.add("cell-image");
                img.onclick = () => {
                    const currImg = this.images.getImagesCropped()[i][j];
                    this.controller.onImageClick(currImg, img);
                };
                img.src = image.getImageUrl();
                imagesContainer.appendChild(img);
            }
        }

        const games = document.querySelector(".game");
        const rotateBtn = document.querySelector(".rotate-btn");
        if (rotateBtn) rotateBtn.remove();
        games.insertAdjacentHTML(
            "beforeend",
            `
            <div class="rotate-btn">
                <button id="rotate90">90</button>
                <button id="rotatem90">-90</button>
                <button id="rotate180">180</button>
                <button id="rotate45">45</button>
                <button id="rotatem45">-45</button>
                <!-- <button id="rotatem180">-180</button> -->
            </div>`
        );

        const rotate90Button = document.querySelector("#rotate90");
        rotate90Button.onclick = () => {
            this.images.rotate90Degrees();
            this.draw({ cols, imageInitialSrc, rows });
        };

        const rotatem90Button = document.querySelector("#rotatem90");
        rotatem90Button.onclick = () => {
            this.images.rotateMinus90Degrees();
            this.draw({ cols, imageInitialSrc, rows });
        };

        const rotate180Button = document.querySelector("#rotate180");
        rotate180Button.onclick = () => {
            this.images.rotate180Degrees();
            this.draw({ cols, imageInitialSrc, rows });
        };

        const rotate45Button = document.querySelector("#rotate45");
        rotate45Button.onclick = () => {
            this.images.rotate45Degrees();
            this.draw({ cols, imageInitialSrc, rows });
        };

        const rotatem45Button = document.querySelector("#rotatem45");
        rotatem45Button.onclick = () => {
            this.images.rotateMinus45Degrees();
            this.draw({ cols, imageInitialSrc, rows });
        };

        // const rotatem180Button = document.querySelector("#rotatem180");
        // rotatem180Button.onclick = () => {
        //     this.images.rotateMinus180Degrees();
        //     this.draw({ cols, imageInitialSrc, rows });
        // };
    }

    adjustCellSize({ cols, rows }) {
        const imagesContainer = document.querySelector(".images");
        imagesContainer.style.display = "grid";
        imagesContainer.style.gap = `${this.GAP}px`;

        imagesContainer.style.gridTemplateColumns = `repeat(${cols}, ${this.CELL_MIN_WIDTH}px)`;
        imagesContainer.style.gridTemplateRows = `repeat(${rows}, ${this.CELL_MIN_HEIGHT}px)`;
        imagesContainer.style.justifyContent = "center";
    }

    static initialImage(src) {
        const initial = document.querySelector(".game .initial");
        initial.innerHTML = `
                        <img class="initial-img" src="${src}" />
                    `;
    }
}
