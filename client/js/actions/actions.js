import * as AT from './actionTypes';

export const start = () => ({
    type: AT.START
});

export const guess = code => ({
    type: AT.GUESS,
    code
});

export const clear = () => ({
    type: AT.CLEAR
});
