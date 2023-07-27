import { compareCards, checkTurn } from "./card-handlers";
import { endGameMessages } from "./message-generator";
import { Messages } from '../models/messages';
import { Turn } from '../models/game-models';

describe('Compare cards', () => {

    test('Greater', () => {
        expect(compareCards(2, 1)).toBe(1);
    });
    test('Lower', () => {
        expect(compareCards(1, 2)).toBe(-1);
    });
    test('Equal', () => {
        expect(compareCards(1, 1)).toBe(0);
    });
    test('Zero vs Four', () => {
        expect(compareCards(0, 4)).toBe(1);
    });
});

describe('Check turn', () => {

    test('No turn', () => {
        expect(checkTurn(2, [2, 3, 4])).toBe(-1);
    });
    test('Turn', () => {
        expect(checkTurn(0, [1, 3, 4])).toBe(1);
    });
    test('Equal', () => {
        expect(checkTurn(1, [1, 1, 1])).toBe(0);
    });
});

describe('End message', () => {
    test('Start game', () => {
        expect(endGameMessages(Turn.NONE)).toEqual([Messages.GAME_TITLE, Messages.START_GAME]);
    });
    test('Human wins', () => {
        expect(endGameMessages(Turn.HUMAN)).toEqual([Messages.HUMAN_WINS, Messages.NEW_GAME]);
    });
    test('Computer wins', () => {
        expect(endGameMessages(Turn.COMPUTER)).toEqual([Messages.COMPUTER_WINS, Messages.NEW_GAME]);
    });
});



