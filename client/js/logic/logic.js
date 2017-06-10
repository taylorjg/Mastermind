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
    const count = (xs, p) => xs.filter(x => x === p).length;
    const add = (a, b) => a + b;
    const sum = PEGS.map(p => Math.min(count(secret, p), count(guess, p))).reduce(add);
    const blacks = secret.filter((peg, index) => peg === guess[index]).length;
    const whites = sum - blacks;
    return { blacks, whites };
};

const ALL_COMBINATIONS =
    Array.from(function* () {
        for (const a of PEGS)
        for (const b of PEGS)
        for (const c of PEGS)
        for (const d of PEGS)
        yield [a, b, c, d];
    }());

const ALL_OUTCOMES =
    Array.from(function* () {
        for (const blacks of [0, 1, 2, 3, 4])
        for (const whites of [0, 1, 2, 3, 4])
        yield { blacks, whites };
    }())
    .filter(fb => fb.blacks + fb.whites <= 4)
    .filter(fb => !(fb.blacks === 3 && fb.whites === 1));

export const initialAutoSolveSet = () => ALL_COMBINATIONS.slice();

const INITIAL_GUESS = [Peg.RED, Peg.RED, Peg.GREEN, Peg.GREEN];

export const generateGuess = (set, usedCodes, lastGuess, lastGuessFeedback) =>
    usedCodes.length
        ? mainAlgorithm(set, usedCodes, lastGuess, lastGuessFeedback)
        : {
            guess: INITIAL_GUESS,
            autoSolveSet: set,
            autoSolveUsed: [INITIAL_GUESS]
        };

const mainAlgorithm = (set, usedCodes, lastGuess, lastGuessFeedback) => {

    const filteredSet = set.filter(evaluatesToSameFeedback(lastGuess, lastGuessFeedback));
    const unusedCodes = initialAutoSolveSet().filter(guess => !usedCodes.find(sameGuessAs(guess)));

    let guess = null;

    if (filteredSet.length === 1) {
        guess = filteredSet[0];
    }
    else {
        const f = filteredSet.length >= 256 ? parallel : serial;
        guess = f(filteredSet, unusedCodes);
    }

    return {
        guess,
        autoSolveSet: filteredSet,
        autoSolveUsed: usedCodes.concat([guess])
    };
};

const parallel = (filteredSet, unusedCodes) => {
    console.log(`[parallel] filteredSet.length: ${filteredSet.length}`);
    const midPoint = unusedCodes.length / 2;
    const uc1 = unusedCodes.slice(0, midPoint);
    const uc2 = unusedCodes.slice(midPoint);
    const { guess: g1, min: m1 } = commonHelper(filteredSet, uc1);
    const { guess: g2, min: m2 } = commonHelper(filteredSet, uc2);
    return m1 < m2 ? g1 : g2;
};

const serial = (filteredSet, unusedCodes) => {
    console.log(`[serial] filteredSet.length: ${filteredSet.length}`);
    const { guess } = commonHelper(filteredSet, unusedCodes);
    return guess;
};

const commonHelper = (filteredSet, unusedCodes) => {
    let guess = null;
    let min = Number.MAX_VALUE;
    unusedCodes.forEach(u => {
        let max = 0;
        ALL_OUTCOMES.forEach(outcome => {
            const count = countWithPredicate(filteredSet, evaluatesToSameFeedback(u, outcome));
            if (count > max)
                max = count;
        });
        if (max < min) {
            min = max;
            guess = u;
        }
    });
    return { guess, min };
};

const countWithPredicate = (xs, p) =>
    xs.reduce(
        (acc, x) => acc + (p(x) ? 1 : 0),
        0);

const evaluatesToSameFeedback = (code1, feedback) => code2 =>
    sameFeedback(evaluateGuess(code1, code2), feedback);

const sameFeedback = (fb1, fb2) =>
    fb1.blacks === fb2.blacks &&
    fb1.whites === fb2.whites;

const sameGuessAs = g1 => g2 => g1.every((p, i) => p === g2[i]);
