import { checkTurn, compareCards } from '../helpers/card-handlers';
import { useAppDispatch, useAppSelector } from './redux';
import { Turn } from '../models/game-models';
import { gameSlice } from '../store/reducers/GameSlice';
import { usersSlice } from '../store/reducers/UsersSlice';
import { useEffect } from 'react';
import { turnStep } from '../helpers/userHandlers';

export function useHumanTurn() {
  const { currentTurn, currentCard } = useAppSelector((state) => state.gameReducer);
  const { computer } = useAppSelector((state) => state.usersReducer);
  const { setCurrentCard, setCurrentTurn } = gameSlice.actions;
  const {
    removeFirstCard,
    addCardsToPlayersDeck,
    fillDefenceHand,
    removeDefenceCard,
    incrementPenaltyPoints,
  } = usersSlice.actions;
  const dispatch = useAppDispatch();

  const changeTurn = (penalty: 'penalty' | 'no-penalty') => {
    if (penalty === 'penalty') dispatch(incrementPenaltyPoints(Turn.COMPUTER));
    dispatch(setCurrentTurn(Turn.COMPUTER));
    dispatch(fillDefenceHand(Turn.COMPUTER));
  };

  useEffect(() => {
    if (computer.defenceHand.find((card) => card >= 0) === undefined && currentTurn === Turn.HUMAN)
      changeTurn('penalty');
  }, [computer.defenceHand]);

  const grabCards = (turn: Turn, cards: Array<number>) => {
    dispatch(addCardsToPlayersDeck({ turn: turn, cards: cards }));
    dispatch(setCurrentCard(-1));
  };

  const humanDeckClicked = (card: number) => {
    dispatch(setCurrentCard(card));
    dispatch(removeFirstCard(Turn.HUMAN));

    //if all cards in computer defence are equal currentCard the card is placed back to the deck and a new turn is made
    if (checkTurn(card, computer.defenceHand) === 0) {
      turnStep(() => {
        grabCards(Turn.HUMAN, [card]);
      });
    }

    if (checkTurn(card, computer.defenceHand) === -1) {
      turnStep(() => {
        grabCards(Turn.COMPUTER, [card]);
        changeTurn('no-penalty');
      });
    }
  };

  const computerDefenceClicked = (index: number) => {
    if (compareCards(currentCard, computer.defenceHand[index]) === 1) {
      dispatch(
        addCardsToPlayersDeck({
          turn: currentTurn,
          cards: [currentCard, computer.defenceHand[index]],
        })
      );
      dispatch(removeDefenceCard({ turn: Turn.COMPUTER, index }));
      dispatch(setCurrentCard(-1));
    }
  };
  return [humanDeckClicked, computerDefenceClicked];
}
