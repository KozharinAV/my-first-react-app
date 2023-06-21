import CustomButton from "../../components/buttons/CustomButton";
import Card from "../../components/cards/Card";
import DefenceHand from "../../components/cards/DefenceHand";
import PointsPlate from "../../components/plates/PointsPlate";
import { useAppSelector } from "../../hooks/redux";
import { Turn } from "../../models/commonModels";
import classes from "./GameField.module.scss";
import { useComputerTurn } from "../../hooks/computerTurn";
import { useHumanTurn } from "../../hooks/humanTurn";
import { useGamePlay } from "../../hooks/gamePlay";
import DeckField from "../../components/deck-field/DeckField";
import ModalWindow from "../../components/modal-window/ModalWindow";
import { ReactNode } from "react";

export default function GameField() {
  const { currentCard, currentTurn, penaltyLimit, winner } = useAppSelector(
    (state) => state.gameReducer
  );
  const { human, computer } = useAppSelector((state) => state.usersReducer);

  const [humanDeckClicked, computerDefenceClicked] = useHumanTurn();

  useComputerTurn();

  const startClicked = useGamePlay();

  const humanDeckDisabled = currentTurn !== Turn.HUMAN || currentCard >= 0;
  const computerDefenceDisabled =
    currentTurn === Turn.COMPUTER || currentCard < 0;
  const newGameButtonVisibility =
    currentTurn === Turn.HUMAN ? "visible" : "hidden";

  const modalContent = (): ReactNode => {
    let modalMessage = "";
    let buttonMessage = "";
    if (winner === Turn.NONE) {
      modalMessage = 'Игра "Cтенка на стенку"';
      buttonMessage = "Начать игру";
    } else if (winner === Turn.HUMAN) {
      modalMessage = "Вы победили, поздравляю!";
      buttonMessage = "Начать сначала";
    } else {
      modalMessage = "Вы проиграли, не расстраивайтесь";
      buttonMessage = "Начать сначала";
    }
    return (
      <>
        <h2>{modalMessage}</h2>
        <CustomButton text={buttonMessage} onClick={startClicked} />
      </>
    );
  };
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
            turnVisibility={currentTurn === Turn.HUMAN ? "visible" : "hidden"}
          />

          <DefenceHand
            defenceHand={human.defenceHand}
            disabled={true}
            cardClicked={() => {}}
          />
        </aside>
        <div>
          <Card type={currentCard} disabled={true} onClick={() => {}} />
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
            turnVisibility={
              currentTurn === Turn.COMPUTER ? "visible" : "hidden"
            }
          />
        </aside>
      </main>
      <ModalWindow visible={currentTurn === Turn.NONE}>
        {modalContent()}
      </ModalWindow>
      <div
        className={classes.button}
        style={{
          visibility: newGameButtonVisibility,
        }}
      >
        <CustomButton text="Начать сначала" onClick={startClicked} />
      </div>
    </>
  );
}
