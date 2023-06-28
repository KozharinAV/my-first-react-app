import { Messages } from '../models/messages';
import { Turn } from '../models/game-models';

export const endGameMessages = (winner: Turn): Array<string> => {
  let modalMessage = '';
  let buttonMessage = '';
  if (winner === Turn.NONE) {
    modalMessage = Messages.GAME_TITLE;
    buttonMessage = Messages.START_GAME;
  } else if (winner === Turn.HUMAN) {
    modalMessage = Messages.HUMAN_WINS;
    buttonMessage = Messages.NEW_GAME;
  } else {
    modalMessage = Messages.COMPUTER_WINS;
    buttonMessage = Messages.NEW_GAME;
  }
  return [modalMessage, buttonMessage];
};
