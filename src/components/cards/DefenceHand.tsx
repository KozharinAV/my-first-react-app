import classes from "./DefenceHand.module.scss";
import Card from "./Card";

interface PropType {
  defenceHand: Array<number>;
  disabled: boolean;
  cardClicked(index: number): void;
}

export default function DefenceHand({ defenceHand, disabled, cardClicked }: PropType) {
  return (
    <div className={classes.wrapper}>
      {defenceHand.map((card, index) => (
        <Card
          type={card}
          disabled={disabled}
          onClick={() => cardClicked(index)}
          key={index}
        />
      ))}
    </div>
  );
}
