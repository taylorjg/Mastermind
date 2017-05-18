import { GameState, PegColours } from '../constants';
import * as AT from '../actions/actionTypes';

const initialState = {
    gameState: GameState.INITIALISED,
    secret: [null, null, null, null],
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
                    PegColours.RED,
                    PegColours.YELLOW,
                    PegColours.GREEN,
                    PegColours.BLUE
                ],
                guesses: [
                    {
                        active: true,
                        code: [null, null, null, null],
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
                gameState: GameState.WON
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
                        code: [null, null, null, null],
                        feedback: {
                            blacks: action.blacks,
                            whites: action.whites
                        }
                    }
                ]
            };

        case AT.EXCEEDED_GUESSES:
            return {
                ...state,
                gameState: GameState.LOST
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
                            code: [null, null, null, null]
                        })
                ]
            };

        default:
            return state;
    }
};
