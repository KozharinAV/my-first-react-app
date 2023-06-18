import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Player, Turn } from "../../models/commonModels";
import { getInitialPlayer } from "../../helpers/userHandlers";

interface PlayersState {
  human: Player;
  computer: Player;
}

const initialState: PlayersState = {
  human: getInitialPlayer(),
  computer: getInitialPlayer(),
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    removeFirstCard(state, action: PayloadAction<Turn>) {
      action.payload === Turn.HUMAN ? state.human.cards.shift() : state.computer.cards.shift();
    },
    fillDefenceHand(state, action: PayloadAction<Turn>) {
      action.payload === Turn.HUMAN
        ? state.human.defenceHand.map((card) => (card < 0 ? state.human.cards.shift() : card))
        : state.computer.defenceHand.map((card) =>
            card < 0 ? state.computer.cards.shift() : card
          );
    },
    incrementPenaltyPoints(state, action: PayloadAction<Turn>) {
      action.payload === Turn.HUMAN ? state.human.penaltyPoints++ : state.computer.penaltyPoints++;
    },
  },
});

export default usersSlice.reducer;
