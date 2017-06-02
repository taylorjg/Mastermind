import { Peg } from '../constants';

export const evaluateGuess = (secret, guess) => {
    const pairs = secret.map((item, index) => [item, guess[index]]);
    const matchingPairs = pairs.filter(([item1, item2]) => item1 === item2);
    const remainingPairs = pairs.filter(([item1, item2]) => item1 !== item2);
    const remainingSecretPegs = remainingPairs.map(pair => pair[0]);
    const remainingGuessPegs = remainingPairs.map(pair => pair[1]);
    const seed = { total: 0, done: []};
    const acc = remainingGuessPegs.reduce((acc, el) => {
        if (acc.done.includes(el)) return acc;
        const ns = remainingSecretPegs.filter(peg => peg === el).length;
        const ng = remainingGuessPegs.filter(peg => peg === el).length;
        const total = acc.total + Math.min(ns, ng);
        const done = acc.done.slice();
        done.push(el);
        return { total, done };
    }, seed);
    return {
        blacks: matchingPairs.length,
        whites: acc.total
    };
};

export const initialAutoSolveSet = () => {
    const pegs = [
        Peg.RED,
        Peg.GREEN,
        Peg.BLUE,
        Peg.YELLOW,
        Peg.BLACK,
        Peg.WHITE
    ];
    const set = [];
    for (const a of pegs)
    for (const b of pegs)
    for (const c of pegs)
    for (const d of pegs)
        set.push([a, b, c, d]);
    return set;
};

const INITIAL_GUESS = [Peg.RED, Peg.RED, Peg.GREEN, Peg.GREEN];

// https://en.wikipedia.org/wiki/Mastermind_(board_game)#Five-guess_algorithm
// https://math.stackexchange.com/questions/1192961/knuths-mastermind-algorithm
export const generateGuess = (autoSolveSet, autoSolveLastFeedback) => {
    const guess = autoSolveLastFeedback
        ? mainAlgorithm(autoSolveSet, autoSolveLastFeedback)
        : INITIAL_GUESS;
    return {
        guess,
        autoSolveSet: autoSolveSet.filter(notSameGuessAs(guess))
    };
};

const mainAlgorithm = (autoSolveSet, autoSolveLastFeedback) => {
    // TODO: implement the real algorithm.
    return autoSolveLastFeedback.blacks > 0 ? autoSolveSet[0] : autoSolveSet[1];
};

const notSameGuessAs = g1 => g2 => g1.some((p, i) => p !== g2[i]);
// const sameGuessAs = g1 => g2 => g1.every((p, i) => p === g2[i]);
