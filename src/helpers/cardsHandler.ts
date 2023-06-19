export const compareCards = (card1: number, card2: number): number => {
  if (card1 === card2) return 0;
  if (card1 > card2) return 1;
  if (card1 === 0 && card2 === 4) return 1;
  return -1;
};

export const checkTurn = (currentCard: number, defenceHand: Array<number>): number => {
  let seniorityCounter = 0;
  let equalityCounter = 0;
  let liveCardsCounter = 0;
  defenceHand.forEach((card) => {
    if (card >= 0 && compareCards(currentCard, card) === 1) seniorityCounter++;
    if (compareCards(currentCard, card) === 0) equalityCounter++;
    if (card >= 0) liveCardsCounter++;
  });
  if (seniorityCounter) return 1;
  if (equalityCounter && equalityCounter === liveCardsCounter) return 0;
  return -1;
};
