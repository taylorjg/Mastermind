import { MAX_GUESSES, GameState, Peg } from '../constants';
import * as AT from '../actions/actionTypes';
import Guess from '../models/guess';

const EMPTY_CODE = Array(4).fill(Peg.UNSELECTED);
const EMPTY_FEEDBACK_PEGS = [];
const EMPTY_GUESS = new Guess(EMPTY_CODE, EMPTY_FEEDBACK_PEGS);
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
                    state.guesses[state.activeGuessIndex].updateCodePeg(action.index, action.peg),
                    ...state.guesses.slice(state.activeGuessIndex + 1)
                ]
            };

        case AT.CORRECT_GUESS:
            return {
                ...state,
                gameState: GameState.WON,
                guesses: [
                    ...state.guesses.slice(0, state.activeGuessIndex),
                    state.guesses[state.activeGuessIndex].updateFeedbackPegs(action.feedbackPegs),
                    ...state.guesses.slice(state.activeGuessIndex + 1)
                ],
                activeGuessIndex: NO_ACTIVE_GUESS
            };

        case AT.INCORRECT_GUESS:
            return {
                ...state,
                guesses: [
                    ...state.guesses.slice(0, state.activeGuessIndex),
                    state.guesses[state.activeGuessIndex].updateFeedbackPegs(action.feedbackPegs),
                    ...state.guesses.slice(state.activeGuessIndex + 1)
                ],
                activeGuessIndex: state.activeGuessIndex + 1
            };

        case AT.EXCEEDED_GUESSES:
            return {
                ...state,
                gameState: GameState.LOST,
                guesses: [
                    ...state.guesses.slice(0, state.activeGuessIndex),
                    state.guesses[state.activeGuessIndex].updateFeedbackPegs(action.feedbackPegs)
                ],
                activeGuessIndex: NO_ACTIVE_GUESS
            };

        default:
            return state;
    }
};
