import Card from "../../components/cards/Card";
import CardDeck from "../../components/cards/CardDeck";
import DefenceHand from "../../components/cards/DefenceHand";
import PointsPlate from "../../components/plates/PointsPlate";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Turn } from "../../models/commonModels";
import { gameSlice } from "../../store/reducers/GameSlice";
import { usersSlice } from "../../store/reducers/UsersSlice";
import classes from "./GameField.module.scss";

export default function GameField() {
  const { currentCard, currentTurn } = useAppSelector(
    (state) => state.gameReducer
  );
  const { human, computer } = useAppSelector((state) => state.usersReducer);
  const { setCurrentCard } = gameSlice.actions;
  const { removeFirstCard } = usersSlice.actions;
  const dispatch = useAppDispatch();

  const humanDeckClicked = (card: number) => {
    dispatch(setCurrentCard(card));
    dispatch(removeFirstCard(Turn.HUMAN));
  };
  return (
    <>
      <PointsPlate />
      <main className={classes.wrapper}>
        <aside className={classes.aside}>
          <CardDeck
            cards={human.cards}
            renderType="left"
            disabled={currentTurn === Turn.COMPUTER}
            onClick={humanDeckClicked}
          />
          <DefenceHand
            defenceHand={human.defenceHand}
            disabled={false}
            cardClicked={() => {}}
          />
        </aside>
        <div>
          <Card type={currentCard} disabled={true} onClick={() => {}} />
        </div>
        <aside className={classes.aside}>
          <DefenceHand
            defenceHand={computer.defenceHand}
            disabled={false}
            cardClicked={() => {}}
          />
          <CardDeck
            cards={computer.cards}
            renderType="right"
            disabled={true}
            onClick={() => {}}
          />
        </aside>
      </main>
    </>
  );
}
