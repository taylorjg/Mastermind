export const MAX_GUESSES = 10;

export const Peg = {
    UNSELECTED: Symbol('unselected'),
    RED: Symbol('red'),
    GREEN: Symbol('green'),
    BLUE: Symbol('blue'),
    YELLOW: Symbol('yellow'),
    BLACK: Symbol('black'),
    WHITE: Symbol('white')
};

export const GameState = {
    INITIALISED: Symbol('initialised'),
    IN_PROGRESS: Symbol('in_progress'),
    WON: Symbol('won'),
    LOST: Symbol('lost')
};
