import { GameState, Peg } from '../constants';
import * as AT from '../actions/actionTypes';

const EMPTY_CODE = Array(4).fill(Peg.UNSELECTED);

const initialState = {
    gameState: GameState.INITIALISED,
    secret: EMPTY_CODE,
    guesses: []
};

export default (state = initialState, action) => {

    console.log(`action.type: ${action.type}`);

    switch (action.type) {

        case AT.START:
            return {
                ...state,
                gameState: GameState.IN_PROGRESS,
                secret: [
                    Peg.RED,
                    Peg.YELLOW,
                    Peg.GREEN,
                    Peg.BLUE
                ],
                guesses: [
                    {
                        active: true,
                        code: EMPTY_CODE,
                        feedback: {
                            blacks: 0,
                            whites: 0
                        }
                    }
                ]
            };

        case AT.SET_PEG:
            return {
                ...state,
                guesses: [
                    ...state.guesses.slice(0, state.guesses.length - 1),
                    Object.assign(
                        {},
                        state.guesses[state.guesses.length - 1],
                        {
                            code: [
                                ...state.guesses[state.guesses.length - 1].code.slice(0, action.index),
                                action.peg,
                                ...state.guesses[state.guesses.length - 1].code.slice(action.index + 1),
                            ]
                        })
                ]
            };

        case AT.CORRECT_GUESS:
            return {
                ...state,
                gameState: GameState.WON,
                guesses: [
                    ...state.guesses.slice(0, state.guesses.length - 1),
                    Object.assign(
                        {},
                        state.guesses[state.guesses.length - 1],
                        {
                            active: false
                        })
                ]
            };

        case AT.INCORRECT_GUESS:
            return {
                ...state,
                guesses: [
                    ...state.guesses.slice(0, state.guesses.length - 1),
                    Object.assign(
                        {},
                        state.guesses[state.guesses.length - 1],
                        {
                            active: false
                        }),
                    {
                        active: true,
                        code: EMPTY_CODE,
                        feedback: {
                            blacks: action.feedback.blacks,
                            whites: action.feedback.whites
                        }
                    }
                ]
            };

        case AT.EXCEEDED_GUESSES:
            return {
                ...state,
                gameState: GameState.LOST,
                guesses: [
                    ...state.guesses.slice(0, state.guesses.length - 1),
                    Object.assign(
                        {},
                        state.guesses[state.guesses.length - 1],
                        {
                            active: false
                        })
                ]
            };

        case AT.CLEAR:
            return {
                ...state,
                guesses: [
                    ...state.guesses.slice(0, state.guesses.length - 1),
                    Object.assign(
                        {},
                        state.guesses[state.guesses.length - 1],
                        {
                            code: EMPTY_CODE
                        })
                ]
            };

        default:
            return state;
    }
};
