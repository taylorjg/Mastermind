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
export const generateGuess = (autoSolveSet, code, feedback) => {
    const [guess, newAutoSolveSet] = code && feedback
        ? mainAlgorithm(autoSolveSet, code, feedback)
        : [INITIAL_GUESS, autoSolveSet];
    return {
        guess,
        autoSolveSet: newAutoSolveSet.filter(notSameGuessAs(guess))
    };
};

const mainAlgorithm = (autoSolveSet, code, feedback) => {
    const newAutoSolveSet = autoSolveSet.filter(hasSameFeedbackAs(code, feedback));
    newAutoSolveSet.forEach(s => console.log(`s: ${s.map(p => p.valueOf().toString()).join(', ')}`));
    return [newAutoSolveSet[0], newAutoSolveSet];
};

const hasSameFeedbackAs = (code, feedback) => s => {
    const feedback2 = evaluateGuess(s, code);
    return feedback.blacks === feedback2.blacks && feedback.whites === feedback2.whites;
};

const notSameGuessAs = g1 => g2 => g1.some((p, i) => p !== g2[i]);
// const sameGuessAs = g1 => g2 => g1.every((p, i) => p === g2[i]);
