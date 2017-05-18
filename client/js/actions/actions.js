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
            dispatch(correctGuess(feedback));
        } else {
            if (state.guesses.length === MAX_GUESSES) {
                dispatch(exceededGuesses(feedback));
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

export const correctGuess = feedback => ({
    type: AT.CORRECT_GUESS,
    feedback
});

export const incorrectGuess = feedback => ({
    type: AT.INCORRECT_GUESS,
    feedback
});

export const exceededGuesses = feedback => ({
    type: AT.EXCEEDED_GUESSES,
    feedback
});
