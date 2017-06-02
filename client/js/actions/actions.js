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

export const setPeg = (index, peg) => ({
    type: AT.SET_PEG,
    index,
    peg
});

export const guess = () =>
    (dispatch, getState) => {
        const state = getState();
        const guess = state.guesses[state.activeGuessIndex].code;
        const feedback = evaluateGuess(state.secret, guess);
        const feedbackPegs = feedbackToFeedbackPegs(feedback);
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

export const autoGuess = () =>
    (dispatch, getState) => {
        const state = getState();
        const lastGuess = state.activeGuessIndex >= 1 ? state.guesses[state.activeGuessIndex - 1] : null;
        const code = lastGuess ? lastGuess.code : null;
        const feedbackPegs = lastGuess ? lastGuess.feedbackPegs : null;
        const feedback = feedbackPegs ? feedbackPegsToFeedback(feedbackPegs) : null;
        const generatedGuess = generateGuess(state.autoSolveSet, state.autoSolveUsed, code, feedback);
        dispatch(setGeneratedGuess(generatedGuess));
        dispatch(guess());
    };

export const setGeneratedGuess = generatedGuess => ({
    type: AT.SET_GENERATED_GUESS,
    generatedGuess
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

const feedbackToFeedbackPegs = feedback =>
    [].concat(
        Array(feedback.blacks).fill(FeedbackPeg.BLACK),
        Array(feedback.whites).fill(FeedbackPeg.WHITE)
    );

const feedbackPegsToFeedback = feedbackPegs => ({
    blacks: feedbackPegs.filter(fp => fp === FeedbackPeg.BLACK).length,
    whites: feedbackPegs.filter(fp => fp === FeedbackPeg.WHITE).length
});
