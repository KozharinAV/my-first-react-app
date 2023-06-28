import { checkTurn } from '../helpers/cardHandlers';
import { useAppDispatch, useAppSelector } from './redux';
import { Turn } from '../models/game-models';
import { gameSlice } from '../store/reducers/GameSlice';
import { usersSlice } from '../store/reducers/UsersSlice';
import { useEffect } from 'react';
import { chooseCardToStrike } from '../helpers/computerLogic';
import { turnStep } from '../helpers/userHandlers';

export function useComputerTurn() {
  const { currentTurn, currentCard, penaltyLimit } = useAppSelector((state) => state.gameReducer);
  const { human, computer } = useAppSelector((state) => state.usersReducer);
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
    dispatch(setCurrentTurn(Turn.HUMAN));
    dispatch(fillDefenceHand(Turn.HUMAN));
    if (penalty === 'penalty') dispatch(incrementPenaltyPoints(Turn.HUMAN));
  };

  const grabCards = (turn: Turn, cards: Array<number>) => {
    dispatch(addCardsToPlayersDeck({ turn: turn, cards: cards }));
    dispatch(setCurrentCard(-1));
  };

  const putCurrentCard = () => {
    turnStep(() => {
      if (computer.cards.length) {
        dispatch(setCurrentCard(computer.cards[0]));
        dispatch(removeFirstCard(Turn.COMPUTER));
      }
    });
  };

  const checkDefence = (turnCard: number) => {
    turnStep(() => {
      if (checkTurn(turnCard, human.defenceHand) === 1) {
        const indexToStrike = chooseCardToStrike(turnCard, human.defenceHand);
        grabCards(Turn.COMPUTER, [turnCard, human.defenceHand[indexToStrike]]);
        dispatch(removeDefenceCard({ turn: Turn.HUMAN, index: indexToStrike }));
      }
      if (checkTurn(turnCard, human.defenceHand) === 0) {
        grabCards(Turn.COMPUTER, [turnCard]);
        putCurrentCard();
      }
      if (checkTurn(turnCard, human.defenceHand) === -1) {
        grabCards(Turn.HUMAN, [turnCard]);
        changeTurn('no-penalty');
      }
    });
  };

  useEffect(() => {
    if (currentTurn === Turn.COMPUTER && computer.penaltyPoints !== penaltyLimit)
      human.defenceHand.find((card) => card >= 0) === undefined
        ? changeTurn('penalty')
        : putCurrentCard();
  }, [human.defenceHand, currentTurn]);

  useEffect(() => {
    if (currentTurn === Turn.COMPUTER && currentCard >= 0) checkDefence(currentCard);
  }, [currentCard]);
}
