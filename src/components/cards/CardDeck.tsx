import { Images } from "../../models/commonModels";
import classes from "./CardDeck.module.scss";

interface PropType {
  cards: Array<number>;
}
export default function CardDeck({ cards }: PropType) {
  return (
    <div className={classes.wrapper}>
      {cards.map(() => (
        <img
          className={classes.image}
          src={Images.CARD}
          alt="Cards"
        />
      ))}
    </div>
  );
}
