import * as AT from './actionTypes';
import { MAX_GUESSES } from '../constants';

export const start = () => ({
    type: AT.START
});

export const addPegToGuess = (index, peg) => ({
    type: AT.ADD_PEG_TO_GUESS,
    index,
    peg
});

export const guess = guess =>
    (dispatch, getState) => {
        const state = getState();
        const { blacks, whites } = evaluateGuess(state.secret, guess);
        if (blacks === 4) {
            dispatch({ type: AT.CORRECT_GUESS });
        } else {
            if (state.guesses.length === MAX_GUESSES) {
                dispatch({ type: AT.EXCEEDED_GUESSES });
            } else {
                dispatch({ type: AT.INCORRECT_GUESS, blacks, whites });
            }
        }
    };

const evaluateGuess = (secret, guess) => {
    const pairs = secret.map((item, index) => [item, guess[index]]);
    const matchingPairs = pairs.filter(([item1, item2]) => item1 === item2);
    const remainingPairs = pairs.filter(([item1, item2]) => item1 !== item2);
    const remainingSecretPegs = remainingPairs.map(pair => pair[0]);
    const remainingGuessPegs = remainingPairs.map(pair => pair[1]);
    const remainingCommonSecretPegs = remainingSecretPegs.filter(peg => remainingGuessPegs.includes(peg));
    const remainingCommonGuessPegs = remainingGuessPegs.filter(peg => remainingSecretPegs.includes(peg));
    const minRemainingCommon = Math.min(remainingCommonGuessPegs.length, remainingCommonSecretPegs.length);
    return {
        blacks: matchingPairs.length,
        whites: minRemainingCommon
    };
};

export const clear = () => ({
    type: AT.CLEAR
});
