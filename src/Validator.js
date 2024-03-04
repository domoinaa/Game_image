export class Validator {
    constructor() {
        this.subscribers = [];
    }

    subscribeOnGameOver(subscriber) {
        this.subscribers.push(subscriber);
        // this.onGameOver();
    }

    onGameOver() {
        const gameOver = this.isGameOver();
        if (gameOver) this.executeSubscriber();
        return gameOver;
    }

    movedCellImage(isLastPositionValid, to) {
        // To be implemented in child classes
    }

    isGameOver() {
        // To be implemented in child classes
        return false;
    }

    executeSubscriber() {
        this.subscribers.forEach((subscriber) => subscriber());
    }
}
