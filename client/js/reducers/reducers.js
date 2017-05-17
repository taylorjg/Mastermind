import { GameState, PegColours } from '../constants';

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
    console.log(`action: ${JSON.stringify(action)}`);
    switch (action.type) {
        default:
            return state;
    }
};
