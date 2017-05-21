import * as AT from './actionTypes';
import { MAX_GUESSES, Peg, FeedbackPeg } from '../constants';
import { evaluateGuess} from '../logic';

const randomSecret = () => {
    const keys = Object.keys(Peg);
    const chooseRandomPeg = () => {
        const randomIndex = Math.floor((Math.random() * keys.length));
        const peg = Peg[keys[randomIndex]];
        return peg !== Peg.UNSELECTED ? peg : chooseRandomPeg();
    };
    const secret = [0, 1, 2, 3].map(chooseRandomPeg);
    console.log(`[randomSecret] secret: ${secret.map(x => x.valueOf().toString()).join()}`);
    return secret;
}; 

export const start = () => ({
    type: AT.START,
    secret: randomSecret()
});

export const guess = guess =>
    (dispatch, getState) => {
        const state = getState();
        const feedback = evaluateGuess(state.secret, guess);
        const feedbackPegs = [].concat(
            Array(feedback.blacks).fill(FeedbackPeg.BLACK),
            Array(feedback.whites).fill(FeedbackPeg.WHITE)
        );
        if (feedback.blacks === 4) {
            dispatch(correctGuess());
        } else {
            if (state.guesses.length === MAX_GUESSES) {
                dispatch(exceededGuesses());
            } else {
                dispatch(incorrectGuess(feedbackPegs));
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

export const incorrectGuess = feedbackPegs => ({
    type: AT.INCORRECT_GUESS,
    feedbackPegs
});

export const exceededGuesses = () => ({
    type: AT.EXCEEDED_GUESSES
});
