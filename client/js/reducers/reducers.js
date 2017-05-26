import { MAX_GUESSES, GameState, Peg } from '../constants';
import * as AT from '../actions/actionTypes';

const EMPTY_CODE = Array(4).fill(Peg.UNSELECTED);
const EMPTY_FEEDBACK_PEGS = [];
const EMPTY_GUESS = {
    code: EMPTY_CODE,
    feedbackPegs: EMPTY_FEEDBACK_PEGS
};
const EMPTY_GUESSES = Array(MAX_GUESSES).fill(EMPTY_GUESS);
const NO_ACTIVE_GUESS = -1;

const initialState = {
    gameState: GameState.INITIALISED,
    secret: EMPTY_CODE,
    guesses: EMPTY_GUESSES,
    activeGuessIndex: NO_ACTIVE_GUESS
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
                activeGuessIndex: 0
            };

        case AT.SET_PEG:
            return {
                ...state,
                guesses: [
                    ...state.guesses.slice(0, state.activeGuessIndex),
                    Object.assign(
                        {},
                        state.guesses[state.activeGuessIndex],
                        {
                            code: [
                                ...state.guesses[state.activeGuessIndex].code.slice(0, action.index),
                                action.peg,
                                ...state.guesses[state.activeGuessIndex].code.slice(action.index + 1),
                            ]
                        }),
                    ...state.guesses.slice(state.activeGuessIndex + 1),
                ]
            };

        case AT.CORRECT_GUESS:
            return {
                ...state,
                gameState: GameState.WON,
                guesses: [
                    ...state.guesses.slice(0, state.activeGuessIndex),
                    Object.assign(
                        {},
                        state.guesses[state.activeGuessIndex],
                        {
                            feedbackPegs: action.feedbackPegs
                        }),
                    ...state.guesses.slice(state.activeGuessIndex + 1)
                ],
                activeGuessIndex: NO_ACTIVE_GUESS
            };

        case AT.INCORRECT_GUESS:
            return {
                ...state,
                guesses: [
                    ...state.guesses.slice(0, state.activeGuessIndex),
                    Object.assign(
                        {},
                        state.guesses[state.activeGuessIndex],
                        {
                            feedbackPegs: action.feedbackPegs
                        }),
                    Object.assign(
                        {},
                        state.guesses[state.activeGuessIndex + 1],
                        {
                            code: state.guesses[state.activeGuessIndex].code
                        }),
                    ...state.guesses.slice(state.activeGuessIndex + 2)
                ],
                activeGuessIndex: state.activeGuessIndex + 1
            };

        case AT.EXCEEDED_GUESSES:
            return {
                ...state,
                gameState: GameState.LOST,
                guesses: [
                    ...state.guesses.slice(0, state.activeGuessIndex),
                    Object.assign(
                        {},
                        state.guesses[state.activeGuessIndex],
                        {
                            feedbackPegs: action.feedbackPegs
                        })
                ],
                activeGuessIndex: NO_ACTIVE_GUESS
            };

        case AT.CLEAR:
            return {
                ...state,
                guesses: [
                    ...state.guesses.slice(0, state.activeGuessIndex),
                    Object.assign(
                        {},
                        state.guesses[state.activeGuessIndex],
                        {
                            code: EMPTY_CODE
                        }),
                    ...state.guesses.slice(state.activeGuessIndex + 1)
                ]
            };

        default:
            return state;
    }
};
