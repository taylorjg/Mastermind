import { Peg } from '../constants';

const PEGS = [
    Peg.RED,
    Peg.GREEN,
    Peg.BLUE,
    Peg.YELLOW,
    Peg.BLACK,
    Peg.WHITE
];

export const evaluateGuess = (secret, guess) => {
    const zipped = secret.map((item, index) => [item, guess[index]]);
    const matchingPairs = zipped.filter(([a, b]) => a === b);
    const blacks = matchingPairs.length;
    const count = (xs, p) => xs.filter(x => x === p).length;
    const add = (a, b) => a + b;
    const sum = PEGS
        .map(p => Math.min(count(secret, p), count(guess, p)))
        .reduce(add);
    const whites = sum - blacks;
    return { blacks, whites };
};

export const initialAutoSolveSet = () =>
    Array.from(function* () {
        for (const a of PEGS)
        for (const b of PEGS)
        for (const c of PEGS)
        for (const d of PEGS)
        yield [a, b, c, d];
    }());

const INITIAL_GUESS = [Peg.RED, Peg.RED, Peg.GREEN, Peg.GREEN];

export const generateGuess = (s, used, code, feedback) =>
    used.length
        ? mainAlgorithm(s, used, code, feedback)
        : {
            guess: INITIAL_GUESS,
            autoSolveSet: s,
            autoSolveUsed: [INITIAL_GUESS]
        };

const mainAlgorithm = (s, used, code, feedback) => {
    const newAutoSolveSet = s.filter(hasSameFeedbackAs(code, feedback));
    newAutoSolveSet.forEach(s => console.log(`s: ${s.map(p => p.valueOf().toString()).join(', ')}`));
    const guess = newAutoSolveSet[0];
    return {
        guess,
        autoSolveSet: newAutoSolveSet,
        autoSolveUsed: used.concat([guess])
    };
};

const hasSameFeedbackAs = (code, feedback) => s => {
    const feedback2 = evaluateGuess(s, code);
    return feedback.blacks === feedback2.blacks && feedback.whites === feedback2.whites;
};

// const notSameGuessAs = g1 => g2 => g1.some((p, i) => p !== g2[i]);
// const sameGuessAs = g1 => g2 => g1.every((p, i) => p === g2[i]);
