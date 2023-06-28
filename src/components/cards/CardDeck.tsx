import { useCallback, useMemo } from 'react';
import { Images } from '../../models/image-paths';
import classes from './CardDeck.module.scss';

interface PropType {
  cards: Array<number>;
  renderType: 'right' | 'left';
  disabled: boolean;
  onClick(card: number): void;
}

const CARD_WIDTH = 150;
const OFFSET = 2;

export default function CardDeck({ cards, renderType, disabled, onClick }: PropType) {
  const style = useMemo((): object => {
    return renderType === 'right'
      ? { marginLeft: -(CARD_WIDTH + OFFSET) }
      : { marginLeft: -(CARD_WIDTH - OFFSET) };
  }, [cards.length, disabled]);
  const deckClicked = useCallback(() => onClick(cards[0]), [onClick]);

  return (
    <button
      className={classes.wrapper}
      onClick={deckClicked}
      disabled={disabled}
    >
      <img
        className={classes.image}
        style={{ marginRight: 0, marginLeft: 0 }}
        src={Images.CARD}
        alt={cards[0].toString()}
      />

      {cards.map((card, index) => {
        if (index > 0)
          return (
            <img
              className={classes.image}
              style={style}
              src={Images.CARD}
              alt={card.toString()}
              key={index}
            />
          );
      })}
    </button>
  );
}
