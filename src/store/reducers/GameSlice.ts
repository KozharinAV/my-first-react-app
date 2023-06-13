import { createSlice } from "@reduxjs/toolkit";
import { Game } from "../../models/IGame";
import { User } from "../../models/IUser";

interface GameState {
    player: User;
    opponent: User;
    game: Game;
}

const initialState: GameState = {
    player: new User(),
    opponent: new User(),
    game: new Game()

};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {

    }
});

export default gameSlice.reducer;
