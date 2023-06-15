import Card from "../../components/cards/Card";
import CardDeck from "../../components/cards/CardDeck";
import DefenceHand from "../../components/cards/DefenceHand";
import PointsTable from "../../components/points-table/PointsTable";
import { useAppSelector } from "../../hooks/redux";
import classes from "./GameField.module.scss";

export default function GameField() {
  const { currentCard } = useAppSelector((state) => state.gameReducer);
  const { human, computer } = useAppSelector((state) => state.usersReducer);
  return (
    <>
      <PointsTable />
      <main className={classes.wrapper}>
        <aside className={classes.aside}>
          {/* <CardDeck cards={human.cards} /> */}
          <DefenceHand
            defenceHand={human.defenceHand}
            disabled={false}
            cardClicked={() => {}}
          />
        </aside>
        <div>
          <Card
            type={currentCard}
            disabled={true}
            onClick={() => {}}
          />
        </div>
        <aside className={classes.aside}>
          <DefenceHand
            defenceHand={computer.defenceHand}
            disabled={false}
            cardClicked={() => {}}
          />
          {/* <CardDeck cards={human.cards} /> */}
        </aside>
      </main>
    </>
  );
}
