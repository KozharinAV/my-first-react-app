import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Turn } from "../../models/commonModels";

interface GameState {
  penaltyLimit: number;
  currentTurn: Turn;
  currentCard: number;
}
const getFirstTurn = () => (Math.round(Math.random()) === 0 ? Turn.HUMAN : Turn.COMPUTER);

const initialState: GameState = {
  penaltyLimit: localStorage.getItem("penaltyLimit")
    ? parseInt(localStorage.getItem("penaltyLimit") as string)
    : 5,
  currentTurn: Turn.NONE,
  currentCard: -1,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setInitialGameState(state) {
      state.currentCard = -1;
      state.currentTurn = getFirstTurn();
    },

    setPenaltyLimit(state, action: PayloadAction<number>) {
      state.penaltyLimit = action.payload;
      localStorage.setItem("penaltyLimit", action.payload.toString());
    },

    setCurrentTurn(state, action: PayloadAction<Turn>) {
      state.currentTurn = action.payload;
    },

    setCurrentCard(state, action: PayloadAction<number>) {
      state.currentCard = action.payload;
    },
  },
});

export default gameSlice.reducer;
