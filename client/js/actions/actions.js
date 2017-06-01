import * as AT from './actionTypes';
import { MAX_GUESSES, Peg, FeedbackPeg } from '../constants';
import { evaluateGuess, generateGuess } from '../logic';

const randomSecret = () => {
    const keys = Object.keys(Peg);
    const chooseRandomPeg = () => {
        const randomIndex = Math.floor((Math.random() * keys.length));
        const peg = Peg[keys[randomIndex]];
        return peg !== Peg.UNSELECTED ? peg : chooseRandomPeg();
    };
    const secret = [0, 1, 2, 3].map(chooseRandomPeg);
    return secret;
}; 

export const start = () => ({
    type: AT.START,
    secret: randomSecret()
});

export const guess = guess =>
    (dispatch, getState) => {
        const state = getState();
        commonGuessEvaluation(dispatch, state, guess);
    };

export const autoGuess = () =>
    (dispatch, getState) => {
        const state = getState();
        const { guess } = generateGuess(state.autoSolveSet);
        commonGuessEvaluation(dispatch, state, guess);
    };

const commonGuessEvaluation = (dispatch, state, guess) => {
    const feedback = evaluateGuess(state.secret, guess);
    const feedbackPegs = [].concat(
        Array(feedback.blacks).fill(FeedbackPeg.BLACK),
        Array(feedback.whites).fill(FeedbackPeg.WHITE)
    );
    if (feedback.blacks === 4) {
        dispatch(correctGuess(feedbackPegs));
    } else {
        if (state.activeGuessIndex >= MAX_GUESSES - 1) {
            dispatch(exceededGuesses(feedbackPegs));
        } else {
            dispatch(incorrectGuess(feedbackPegs));
        }
    }
};

export const setPeg = (index, peg) => ({
    type: AT.SET_PEG,
    index,
    peg
});

export const correctGuess = feedbackPegs => ({
    type: AT.CORRECT_GUESS,
    feedbackPegs
});

export const incorrectGuess = feedbackPegs => ({
    type: AT.INCORRECT_GUESS,
    feedbackPegs
});

export const exceededGuesses = feedbackPegs => ({
    type: AT.EXCEEDED_GUESSES,
    feedbackPegs
});
