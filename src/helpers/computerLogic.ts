import { compareCards } from "../helpers/cardHandlers";

export const chooseCardToStrike = (currentCard: number, defenceHand: Array<number>): number => {
    let maxAvailableCard = -1;
    let maxAvailableCardIndex = -1;
    defenceHand.forEach((card, index) => {
        if (compareCards(currentCard, card) === 1 && card > maxAvailableCard) {
            maxAvailableCard = card;
            maxAvailableCardIndex = index;
        }
    });
    return maxAvailableCardIndex;
};