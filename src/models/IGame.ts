type Turn = "player" | "opponent";

export class Game {
    private penaltyLimit: number;
    private currentTurn: Turn;
    private currentCard: number;

    constructor() {
        this.penaltyLimit = 5;
        this.currentTurn = Math.round(Math.random()) === 0 ? "player" : "opponent";
        this.currentCard = -1;
    }
    setPenaltyLimit(limit: number) {
        this.penaltyLimit = limit;
    }
    getPenaltyLimit() {
        return this.penaltyLimit;
    }
    setCurrentTurn(turn: Turn) {
        this.currentTurn = turn;
    }
    getCurrentTurn() {
        return this.currentTurn;
    }
    setCurrentCard(card: number) {
        this.currentCard = card;
    }
    getCurrentCard() {
        return this.currentCard;
    }
}