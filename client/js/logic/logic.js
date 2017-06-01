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
export const generateGuess = autoSolveSet => {
    const guess = autoSolveSet.length === 1296
        ? INITIAL_GUESS
        : mainAlgorithm(autoSolveSet);
    return {
        guess,
        autoSolveSet: autoSolveSet.filter(!sameAs(guess))
    };
};

const mainAlgorithm = autoSolveSet => {
    // TODO: implement the real algorithm.
    return autoSolveSet[0];
};

const sameAs = g1 => g2 => g1.every((p, i) => p === g2[i]);
