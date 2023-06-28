import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Player } from '../../models/player-models';
import { Turn } from '../../models/game-models';
import { getInitialPlayer } from '../../helpers/userHandlers';

interface PlayersState {
  human: Player;
  computer: Player;
}

const initialState: PlayersState = {
  human: getInitialPlayer(),
  computer: getInitialPlayer(),
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setInitialUsersState(state) {
      state.human = getInitialPlayer();
      state.computer = getInitialPlayer();
    },

    removeFirstCard(state, action: PayloadAction<Turn>) {
      action.payload === Turn.HUMAN ? state.human.cards.shift() : state.computer.cards.shift();
    },

    addCardsToPlayersDeck(state, action: PayloadAction<{ turn: Turn; cards: Array<number> }>) {
      if (action.payload.turn === Turn.HUMAN) state.human.cards.push(...action.payload.cards);
      else state.computer.cards.push(...action.payload.cards);
    },

    fillDefenceHand(state, action: PayloadAction<Turn>) {
      action.payload === Turn.HUMAN
        ? (state.human.defenceHand = state.human.defenceHand.map((card) =>
            card < 0 && state.human.cards.length ? state.human.cards.shift()! : card
          ))
        : (state.computer.defenceHand = state.computer.defenceHand.map((card) =>
            card < 0 && state.computer.cards.length ? state.computer.cards.shift()! : card
          ));
    },

    removeDefenceCard(state, action: PayloadAction<{ turn: Turn; index: number }>) {
      if (action.payload.turn === Turn.HUMAN) state.human.defenceHand[action.payload.index] = -1;
      else state.computer.defenceHand[action.payload.index] = -1;
    },

    incrementPenaltyPoints(state, action: PayloadAction<Turn>) {
      action.payload === Turn.HUMAN ? state.human.penaltyPoints++ : state.computer.penaltyPoints++;
    },
  },
});

export default usersSlice.reducer;
