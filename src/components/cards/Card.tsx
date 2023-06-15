import { Images } from "../../models/commonModels";
import classes from "./Card.module.scss";

interface PropType {
  type: number;
  disabled: boolean;
  onClick(): void;
}

export default function Card({ type, disabled, onClick }: PropType) {
  const cardImage = (): string => {
    switch (type) {
      case -1:
        return Images.CARD;
      case 0:
        return Images.CARD_ZERO;
      case 1:
        return Images.CARD_ONE;
      case 2:
        return Images.CARD_TWO;
      case 3:
        return Images.CARD_THREE;
      case 4:
        return Images.CARD_FOUR;
      default:
        return "";
    }
  };
  return (
    <button
      className={classes.card}
      disabled={disabled || type === -1}
      onClick={onClick}
    >
      <img
        className={classes.image}
        src={cardImage()}
        alt={`${type}`}
      />
    </button>
  );
}
