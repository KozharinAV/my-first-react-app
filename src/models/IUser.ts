export class User {
    private cards: Array<number>;
    private penaltyPoints: number;
    private defenceHand: Array<number>;
    private MAX_CARD_VALUE = 4;

    constructor() {
        this.cards = [];
        for (let i = 0; i <= this.MAX_CARD_VALUE; i++) {
            for (let j = 0; j < 4; j++) {
                this.cards.push(i);
            }
        }
        this.shuffle(this.cards);
        this.penaltyPoints = 0;
        this.defenceHand = new Array<number>(3).fill(-1);
    }

    shuffle(array: Array<number>) {
        let currentIndex = array.length,
            randomIndex;

        while (currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
    }

    addCard(card: number) {
        this.cards.push(card);
    }

    getCard() {
        return this.cards.shift();
    }

    addPenaltyPoints() {
        this.penaltyPoints++;
    }

    getPenaltyPoints() {
        return this.penaltyPoints;
    }

    fillDefenceHand() {
        this.defenceHand.map((card) => card < 0 ? this.getCard : card);
    }

    removeDefenceCard(index: number) {
        this.defenceHand[index] = -1;
    }
}