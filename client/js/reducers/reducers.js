import { GameState, Peg } from '../constants';
import * as AT from '../actions/actionTypes';

const EMPTY_CODE = Array(4).fill(Peg.UNSELECTED);
const EMPTY_FEEDBACK_PEGS = [];

const initialState = {
    gameState: GameState.INITIALISED,
    secret: EMPTY_CODE,
    guesses: []
};

export default (state = initialState, action) => {

    console.log(`action.type: ${action.type}`);

    switch (action.type) {

        case AT.START:
            return {
                ...state,
                gameState: GameState.IN_PROGRESS,
                secret: action.secret,
                guesses: [
                    {
                        active: true,
                        code: EMPTY_CODE,
                        feedbackPegs: EMPTY_FEEDBACK_PEGS
                    }
                ]
            };

        case AT.SET_PEG:
            return {
                ...state,
                guesses: [
                    ...state.guesses.slice(0, state.guesses.length - 1),
                    Object.assign(
                        {},
                        state.guesses[state.guesses.length - 1],
                        {
                            code: [
                                ...state.guesses[state.guesses.length - 1].code.slice(0, action.index),
                                action.peg,
                                ...state.guesses[state.guesses.length - 1].code.slice(action.index + 1),
                            ]
                        })
                ]
            };

        case AT.CORRECT_GUESS:
            return {
                ...state,
                gameState: GameState.WON,
                guesses: [
                    ...state.guesses.slice(0, state.guesses.length - 1),
                    Object.assign(
                        {},
                        state.guesses[state.guesses.length - 1],
                        {
                            active: false,
                            feedbackPegs: action.feedbackPegs
                        })
                ]
            };

        case AT.INCORRECT_GUESS:
            return {
                ...state,
                guesses: [
                    ...state.guesses.slice(0, state.guesses.length - 1),
                    Object.assign(
                        {},
                        state.guesses[state.guesses.length - 1],
                        {
                            active: false,
                            feedbackPegs: action.feedbackPegs
                        }),
                    {
                        active: true,
                        code: state.guesses[state.guesses.length - 1].code,
                        feedbackPegs: EMPTY_FEEDBACK_PEGS
                    }
                ]
            };

        case AT.EXCEEDED_GUESSES:
            return {
                ...state,
                gameState: GameState.LOST,
                guesses: [
                    ...state.guesses.slice(0, state.guesses.length - 1),
                    Object.assign(
                        {},
                        state.guesses[state.guesses.length - 1],
                        {
                            active: false,
                            feedbackPegs: action.feedbackPegs
                        })
                ]
            };

        case AT.CLEAR:
            return {
                ...state,
                guesses: [
                    ...state.guesses.slice(0, state.guesses.length - 1),
                    Object.assign(
                        {},
                        state.guesses[state.guesses.length - 1],
                        {
                            code: EMPTY_CODE
                        })
                ]
            };

        default:
            return state;
    }
};
