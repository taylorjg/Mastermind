import { GameState, PegColours } from '../constants';
import * as AT from '../actions/actionTypes';

const initialState = {
    gameState: GameState.INITIALISED,
    secret: [
        PegColours.RED,
        PegColours.YELLOW,
        PegColours.GREEN,
        PegColours.BLUE
    ],
    guesses: [
        {
            active: false,
            code: [
                PegColours.RED,
                PegColours.YELLOW,
                PegColours.BLUE,
                PegColours.WHITE
            ],
            feedback: {
                blacks: 2,
                whites: 1
            }
        },
        {
            active: true,
            code: [
                PegColours.RED,
                PegColours.RED,
                PegColours.WHITE,
                PegColours.GREEN
            ],
            feedback: {
                blacks: 1,
                whites: 1
            }
        }
    ]
};

export default (state = initialState, action) => {

    console.log(`action.type: ${action.type}`);

    switch (action.type) {

        case AT.START:
            return {
                ...state,
                gameState: GameState.IN_PROGRESS,
                guesses: [
                    {
                        active: true,
                        code: [],
                        feedback: {
                            blacks: 0,
                            whites: 0
                        }
                    }
                ]
            };

        case AT.GUESS:
            return {
                ...state
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
                            code: []
                        })
                ]
            };

        default:
            return state;
    }
};
