import * as AT from './actionTypes';
import { MAX_GUESSES } from '../constants';
import { evaluateGuess} from '../logic';

export const start = () => ({
    type: AT.START
});

export const guess = guess =>
    (dispatch, getState) => {
        const state = getState();
        const feedback = evaluateGuess(state.secret, guess);
        if (feedback.blacks === 4) {
            dispatch(correctGuess());
        } else {
            if (state.guesses.length === MAX_GUESSES) {
                dispatch(exceededGuesses());
            } else {
                dispatch(incorrectGuess(feedback));
            }
        }
    };

export const clear = () => ({
    type: AT.CLEAR
});

export const setPeg = (index, peg) => ({
    type: AT.SET_PEG,
    index,
    peg
});

export const correctGuess = () => ({
    type: AT.CORRECT_GUESS
});

export const incorrectGuess = feedback => ({
    type: AT.INCORRECT_GUESS,
    feedback
});

export const exceededGuesses = () => ({
    type: AT.EXCEEDED_GUESSES
});
