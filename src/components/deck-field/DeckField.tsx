import CardDeck from "../cards/CardDeck";
import TextPlate from "../plates/TextPlate";
import classes from "./DeckField.module.scss";

interface PropType {
  cards: Array<number>;
  disabled: boolean;
  turnVisibility: boolean;
  turnText: string;
  deckRenderType: "right" | "left";
  onClick(card: number): void;
}

export default function DeckField({
  cards,
  disabled,
  turnVisibility,
  turnText,
  deckRenderType,
  onClick,
}: PropType) {
  return (
    <div className={classes.deck}>
      <TextPlate
        text={`Карт в колоде ${cards.length}`}
        visible={true}
        size="fixed"
      />

      <CardDeck
        cards={cards}
        renderType={deckRenderType}
        disabled={disabled}
        onClick={onClick}
      />

      <TextPlate text={turnText} visible={turnVisibility} size="fixed" />
    </div>
  );
}
