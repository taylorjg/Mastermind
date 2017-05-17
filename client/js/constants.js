export const MAX_GUESSES = 10;

export const PegColours = {
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
    OVER: Symbol('over'),
};
