
import { checkTurn } from "../helpers/cardHandlers";
import { useAppDispatch, useAppSelector } from "./redux";
import { Turn } from "../models/commonModels";
import { gameSlice } from "../store/reducers/GameSlice";
import { usersSlice } from "../store/reducers/UsersSlice";
import { useEffect } from "react";
import { chooseCardToStrike } from "../helpers/computerLogic";


const turnStep = (callback: Function) => setTimeout(callback, 1000);

export function useComputerTurn() {
    const { currentTurn, currentCard } = useAppSelector(
        (state) => state.gameReducer
    );
    const { human, computer } = useAppSelector((state) => state.usersReducer);
    const { setCurrentCard, setCurrentTurn } =
        gameSlice.actions;
    const {
        removeFirstCard,
        addCardsToPlayersDeck,
        fillDefenceHand,
        removeDefenceCard,
        incrementPenaltyPoints,
    } = usersSlice.actions;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (
            human.defenceHand.find((card) => card >= 0) === undefined &&
            currentTurn === Turn.COMPUTER
        ) {
            dispatch(setCurrentTurn(Turn.HUMAN));
            dispatch(incrementPenaltyPoints(Turn.HUMAN));
            dispatch(fillDefenceHand(Turn.HUMAN));
        }
        if (
            human.defenceHand.find((card) => card >= 0) !== undefined &&
            currentTurn === Turn.COMPUTER
        ) putCurrentCard();
    }, [human.defenceHand, currentTurn]);

    useEffect(() => {
        if (currentTurn === Turn.COMPUTER && currentCard >= 0)
            checkDefence(currentCard);
    }, [currentCard]);

    const putCurrentCard = () => {
        turnStep(() => {
            dispatch(setCurrentCard(computer.cards[0]));
            dispatch(removeFirstCard(Turn.COMPUTER));
        });
    };
    const checkDefence = (turnCard: number) => {
        turnStep(() => {
            if (checkTurn(turnCard, human.defenceHand) === 1) {
                const indexToStrike = chooseCardToStrike(turnCard, human.defenceHand);
                dispatch(addCardsToPlayersDeck({ turn: Turn.COMPUTER, cards: [turnCard, human.defenceHand[indexToStrike]] }));
                dispatch(removeDefenceCard({ turn: Turn.HUMAN, index: indexToStrike }));
                dispatch(setCurrentCard(-1));
            }
            if (checkTurn(turnCard, human.defenceHand) === 0) {
                dispatch(addCardsToPlayersDeck({ turn: Turn.COMPUTER, cards: [turnCard] }));
                dispatch(setCurrentCard(-1));
                putCurrentCard();
            }
            if (checkTurn(turnCard, human.defenceHand) === -1) {
                dispatch(addCardsToPlayersDeck({ turn: Turn.HUMAN, cards: [turnCard] }));
                dispatch(setCurrentCard(-1));
                dispatch(setCurrentTurn(Turn.HUMAN));
                dispatch(fillDefenceHand(Turn.HUMAN));
            }
        });
    };
};
