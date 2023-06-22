import { Images } from "../../models/commonModels";
import classes from "./CardDeck.module.scss";

interface PropType {
  cards: Array<number>;
  renderType: "right" | "left";
  disabled: boolean;
  onClick(card: number): void;
}

const CARD_WIDTH = 150;
const OFFSET = 2;

export default function CardDeck({
  cards,
  renderType,
  disabled,
  onClick,
}: PropType) {
  const style = (index: number) => {
    if (index === 0) {
      return { marginRight: 0, marginLeft: 0 };
    }
    return renderType === "right"
      ? { marginLeft: -(CARD_WIDTH + OFFSET) }
      : { marginLeft: -(CARD_WIDTH - OFFSET) };
  };

  return (
    <button
      className={classes.wrapper}
      onClick={() => onClick(cards[0])}
      disabled={disabled}
    >
      {cards.map((card, index) => (
        <img
          className={classes.image}
          style={style(index)}
          src={Images.CARD}
          alt="Cards"
          key={index * card}
        />
      ))}
    </button>
  );
}
