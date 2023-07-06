import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Turn } from '../../models/game-models';

interface GameState {
  penaltyLimit: number;
  hints: boolean;
  hintText: string;
  currentTurn: Turn;
  currentCard: number;
  winner: Turn;
}
const getFirstTurn = () => (Math.round(Math.random()) === 0 ? Turn.HUMAN : Turn.COMPUTER);

const initialState: GameState = {
  penaltyLimit: 5,
  hints: false,
  hintText: '',
  currentTurn: Turn.NONE,
  currentCard: -1,
  winner: Turn.NONE,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setInitialGameState(state) {
      state.currentCard = -1;
      state.currentTurn = getFirstTurn();
      state.winner = Turn.NONE;
    },

    setPenaltyLimit(state, action: PayloadAction<number>) {
      state.penaltyLimit = action.payload;
    },

    setHints(state) {
      state.hints = !state.hints;
    },

    setHintText(state, action: PayloadAction<string>) {
      state.hintText = action.payload;
    },

    setCurrentTurn(state, action: PayloadAction<Turn>) {
      state.currentTurn = action.payload;
    },

    setCurrentCard(state, action: PayloadAction<number>) {
      state.currentCard = action.payload;
    },

    setWinner(state, action: PayloadAction<Turn>) {
      state.winner = action.payload;
    },
  },
});

export default gameSlice.reducer;
