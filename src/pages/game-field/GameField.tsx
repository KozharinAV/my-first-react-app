import CustomButton from "../../components/buttons/CustomButton";
import Card from "../../components/cards/Card";
import CardDeck from "../../components/cards/CardDeck";
import DefenceHand from "../../components/cards/DefenceHand";
import PointsPlate from "../../components/plates/PointsPlate";
import TextPlate from "../../components/plates/TextPlate";
import { checkTurn, compareCards } from "../../helpers/cardHandlers";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Turn } from "../../models/commonModels";
import { gameSlice } from "../../store/reducers/GameSlice";
import { usersSlice } from "../../store/reducers/UsersSlice";
import classes from "./GameField.module.scss";
import { useEffect } from "react";
import { useComputerTurn } from "../../hooks/computerTurn";

export default function GameField() {
  const { currentCard, currentTurn, penaltyLimit } = useAppSelector(
    (state) => state.gameReducer
  );
  const { human, computer } = useAppSelector((state) => state.usersReducer);
  const { setCurrentCard, setInitialGameState, setCurrentTurn } =
    gameSlice.actions;
  const {
    removeFirstCard,
    addCardsToPlayersDeck,
    fillDefenceHand,
    setInitialUsersState,
    removeDefenceCard,
    incrementPenaltyPoints,
  } = usersSlice.actions;
  const dispatch = useAppDispatch();

  useComputerTurn();

  useEffect(() => {
    if (
      computer.defenceHand.find((card) => card >= 0) === undefined &&
      currentTurn === Turn.HUMAN
    ) {
      dispatch(setCurrentTurn(Turn.COMPUTER));
      dispatch(incrementPenaltyPoints(Turn.COMPUTER));
      dispatch(fillDefenceHand(Turn.COMPUTER));
    }
  }, [computer.defenceHand]);

  const humanDeckClicked = (card: number) => {
    dispatch(setCurrentCard(card));
    dispatch(removeFirstCard(Turn.HUMAN));
    //if all cards in computer defence are equal currentCard the card is placed back to the deck and a new turn is made
    if (checkTurn(card, computer.defenceHand) === 0) {
      setTimeout(() => {
        dispatch(addCardsToPlayersDeck({ turn: Turn.HUMAN, cards: [card] }));
        dispatch(setCurrentCard(-1));
      }, 1000);
    }

    if (checkTurn(card, computer.defenceHand) === -1) {
      setTimeout(() => {
        dispatch(setCurrentTurn(Turn.COMPUTER));
        dispatch(addCardsToPlayersDeck({ turn: Turn.COMPUTER, cards: [card] }));
        dispatch(setCurrentCard(-1));
        dispatch(fillDefenceHand(Turn.COMPUTER));
      }, 1000);
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

  const startClicked = () => {
    dispatch(setInitialGameState());
    dispatch(setInitialUsersState());
    dispatch(fillDefenceHand(Turn.COMPUTER));
    dispatch(fillDefenceHand(Turn.HUMAN));
  };
  return (
    <>
      <PointsPlate
        penaltyLimit={penaltyLimit}
        leftPoints={human.penaltyPoints}
        rightPoints={computer.penaltyPoints}
      />
      <main className={classes.wrapper}>
        {/* Human field */}
        <aside className={classes.aside}>
          <div className={classes.deck}>
            <TextPlate
              text={`Карт в колоде ${human.cards.length}`}
              visibility="visible"
            />
            <CardDeck
              cards={human.cards}
              renderType="left"
              disabled={currentTurn !== Turn.HUMAN || currentCard >= 0}
              onClick={humanDeckClicked}
            />

            <TextPlate
              text={"Ваш ход"}
              visibility={currentTurn === Turn.HUMAN ? "visible" : "hidden"}
            />
          </div>
          <DefenceHand
            defenceHand={human.defenceHand}
            disabled={true}
            cardClicked={() => {}}
          />
        </aside>
        <div>
          <Card type={currentCard} disabled={true} onClick={() => {}} />
        </div>
        {/* Computer field */}
        <aside className={classes.aside}>
          <DefenceHand
            defenceHand={computer.defenceHand}
            disabled={currentTurn === Turn.COMPUTER || currentCard < 0}
            cardClicked={computerDefenceClicked}
          />
          <div className={classes.deck}>
            <TextPlate
              text={`Карт в колоде ${computer.cards.length}`}
              visibility="visible"
            />
            <CardDeck
              cards={computer.cards}
              renderType="right"
              disabled={true}
              onClick={() => {}}
            />
            <TextPlate
              text={"Ход соперника"}
              visibility={currentTurn === Turn.COMPUTER ? "visible" : "hidden"}
            />
          </div>
        </aside>
      </main>
      <div className={classes.button}>
        <CustomButton text="Начать игру" onClick={startClicked} />
      </div>
    </>
  );
}
