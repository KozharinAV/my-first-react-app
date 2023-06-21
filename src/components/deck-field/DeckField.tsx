import CardDeck from "../cards/CardDeck";
import TextPlate from "../plates/TextPlate";
import classes from "./DeckField.module.scss";

interface PropType {
  cards: Array<number>;
  disabled: boolean;
  turnVisibility: "visible" | "hidden";
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
      <TextPlate text={`Карт в колоде ${cards.length}`} visibility="visible" />

      <CardDeck
        cards={cards}
        renderType={deckRenderType}
        disabled={disabled}
        onClick={onClick}
      />

      <TextPlate text={turnText} visibility={turnVisibility} />
    </div>
  );
}
