import { MAX_GUESSES, GameState, Peg } from '../constants';
import * as AT from '../actions/actionTypes';

const EMPTY_CODE = Array(4).fill(Peg.UNSELECTED);
const EMPTY_FEEDBACK_PEGS = [];
const EMPTY_GUESS = {
    code: EMPTY_CODE,
    feedbackPegs: EMPTY_FEEDBACK_PEGS
};
const EMPTY_GUESSES = Array(MAX_GUESSES).fill(EMPTY_GUESS);

const initialState = {
    gameState: GameState.INITIALISED,
    secret: EMPTY_CODE,
    guesses: EMPTY_GUESSES,
    activeGuess: -1
};

export default (state = initialState, action) => {

    console.log(`action.type: ${action.type}`);

    switch (action.type) {

        case AT.START:
            return {
                ...state,
                gameState: GameState.IN_PROGRESS,
                secret: action.secret,
                guesses: EMPTY_GUESSES,
                activeGuess: 0
            };

        case AT.SET_PEG:
            return {
                ...state,
                guesses: [
                    ...state.guesses.slice(0, state.activeGuess),
                    Object.assign(
                        {},
                        state.guesses[state.activeGuess],
                        {
                            code: [
                                ...state.guesses[state.activeGuess].code.slice(0, action.index),
                                action.peg,
                                ...state.guesses[state.activeGuess].code.slice(action.index + 1),
                            ]
                        }),
                    ...state.guesses.slice(state.activeGuess + 1),
                ]
            };

        case AT.CORRECT_GUESS:
            return {
                ...state,
                gameState: GameState.WON,
                guesses: [
                    ...state.guesses.slice(0, state.activeGuess),
                    Object.assign(
                        {},
                        state.guesses[state.activeGuess],
                        {
                            feedbackPegs: action.feedbackPegs
                        }),
                    ...state.guesses.slice(state.activeGuess + 1)
                ],
                activeGuess: -1
            };

        case AT.INCORRECT_GUESS:
            return {
                ...state,
                guesses: [
                    ...state.guesses.slice(0, state.activeGuess),
                    Object.assign(
                        {},
                        state.guesses[state.activeGuess],
                        {
                            feedbackPegs: action.feedbackPegs
                        }),
                    Object.assign(
                        {},
                        state.guesses[state.activeGuess + 1],
                        {
                            code: state.guesses[state.activeGuess].code
                        }),
                    ...state.guesses.slice(state.activeGuess + 2)
                ],
                activeGuess: state.activeGuess + 1
            };

        case AT.EXCEEDED_GUESSES:
            return {
                ...state,
                gameState: GameState.LOST,
                guesses: [
                    ...state.guesses.slice(0, state.activeGuess),
                    Object.assign(
                        {},
                        state.guesses[state.activeGuess],
                        {
                            feedbackPegs: action.feedbackPegs
                        })
                ],
                activeGuess: -1
            };

        case AT.CLEAR:
            return {
                ...state,
                guesses: [
                    ...state.guesses.slice(0, state.activeGuess),
                    Object.assign(
                        {},
                        state.guesses[state.activeGuess],
                        {
                            code: EMPTY_CODE
                        }),
                    ...state.guesses.slice(state.activeGuess + 1)
                ]
            };

        default:
            return state;
    }
};
