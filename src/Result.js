export class Result {
    static remove() {
        const result = document.querySelector(".result");
        if (result) result.remove();
    }
    static winner(counter = 0) {
        Result.remove();
        const result = document.createElement("div");
        result.classList.add("result");
        result.innerHTML = `
            <div class="winner">
                <p>Vous avez gagné le jeu avec ${counter} coups</p>
                <button id="restartgame">Rejouer</button>
            </div>
        `;
        document.body.appendChild(result);
        const btnRestart = document.querySelector("#restartgame");
        btnRestart.onclick = () => {
            console.log("reste");

            Result.onRestart();
        };
    }

    static onRestart() {
        Result.remove();
        window.location.reload();
    }
}
