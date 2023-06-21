import { useAppDispatch, useAppSelector } from "./redux";
import { Turn } from "../models/commonModels";
import { gameSlice } from "../store/reducers/GameSlice";
import { usersSlice } from "../store/reducers/UsersSlice";
import { useEffect } from "react";

export function useGamePlay() {
    const { human, computer } = useAppSelector((state) => state.usersReducer);
    const { penaltyLimit, currentCard, currentTurn } = useAppSelector((state) => state.gameReducer);
    const { setCurrentTurn, setInitialGameState, setWinner } = gameSlice.actions;
    const {
        fillDefenceHand,
        setInitialUsersState
    } = usersSlice.actions;
    const dispatch = useAppDispatch();

    const startClicked = () => {
        dispatch(setInitialGameState());
        dispatch(setInitialUsersState());
        dispatch(fillDefenceHand(Turn.COMPUTER));
        dispatch(fillDefenceHand(Turn.HUMAN));
    };

    const endGame = (winner: Turn) => {
        dispatch(setCurrentTurn(Turn.NONE));
        dispatch(setWinner(winner));
    };

    useEffect(() => {
        if (human.penaltyPoints === penaltyLimit) endGame(Turn.COMPUTER);
        if (computer.penaltyPoints === penaltyLimit) endGame(Turn.HUMAN);
    }, [human.penaltyPoints, computer.penaltyPoints]);

    useEffect(() => {
        if (currentTurn === Turn.HUMAN && currentCard === -1 && !human.cards.length) endGame(Turn.COMPUTER);
        if (currentTurn === Turn.COMPUTER && currentCard === -1 && !computer.cards.length) endGame(Turn.HUMAN);
    }, [currentTurn, currentCard, human.cards, computer.cards]);

    return startClicked;
}