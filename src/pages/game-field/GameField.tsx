import CustomButton from '../../components/buttons/CustomButton';
import Card from '../../components/cards/Card';
import DefenceHand from '../../components/cards/DefenceHand';
import PointsPlate from '../../components/plates/PointsPlate';
import { useAppSelector } from '../../hooks/redux';
import { Turn } from '../../models/game-models';
import classes from './GameField.module.scss';
import { useComputerTurn } from '../../hooks/computer-turn';
import { useHumanTurn } from '../../hooks/human-turn';
import { useGamePlay } from '../../hooks/game-play';
import DeckField from '../../components/deck-field/DeckField';
import ModalWindow from '../../components/modal-window/ModalWindow';
import { endGameMessages } from '../../helpers/message-generator';
import TextPlate from '../../components/plates/TextPlate';

function ModalContent() {
  const { winner } = useAppSelector((state) => state.gameReducer);
  const [modalMessage, buttonMessage] = endGameMessages(winner);
  const startClicked = useGamePlay();
  return (
    <>
      <h2>{modalMessage}</h2>
      <CustomButton
        text={buttonMessage}
        onClick={startClicked}
      />
    </>
  );
}

export default function GameField() {
  const { currentCard, currentTurn, penaltyLimit, hints, hintText } = useAppSelector(
    (state) => state.gameReducer
  );
  const { human, computer } = useAppSelector((state) => state.usersReducer);

  const [humanDeckClicked, computerDefenceClicked] = useHumanTurn();

  useComputerTurn();

  const startClicked = useGamePlay();

  const humanDeckDisabled = currentTurn !== Turn.HUMAN || currentCard >= 0;

  const computerDefenceDisabled = currentTurn === Turn.COMPUTER || currentCard < 0;

  const newGameButtonVisibility = currentTurn === Turn.HUMAN ? 'visible' : 'hidden';

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
          <DeckField
            cards={human.cards}
            deckRenderType="left"
            disabled={humanDeckDisabled}
            onClick={humanDeckClicked}
            turnText="Ваш ход"
            turnVisibility={currentTurn === Turn.HUMAN}
          />

          <DefenceHand
            defenceHand={human.defenceHand}
            disabled={true}
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

        {/* Computer field */}
        <aside className={classes.aside}>
          <DefenceHand
            defenceHand={computer.defenceHand}
            disabled={computerDefenceDisabled}
            cardClicked={computerDefenceClicked}
          />

          <DeckField
            cards={computer.cards}
            deckRenderType="right"
            disabled={true}
            onClick={() => {}}
            turnText="Ход соперника"
            turnVisibility={currentTurn === Turn.COMPUTER}
          />
        </aside>
      </main>

      <ModalWindow visible={currentTurn === Turn.NONE}>
        <ModalContent />
      </ModalWindow>

      <div
        className={classes.button}
        style={{
          visibility: newGameButtonVisibility,
        }}
      >
        <CustomButton
          text="Начать сначала"
          onClick={startClicked}
        />
      </div>

      {/* Hints */}
      <div className={classes.hints}>
        <TextPlate
          text={hintText}
          visible={hints}
          size="flexible"
        />
      </div>
    </>
  );
}
