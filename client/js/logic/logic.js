import { Peg } from '../constants';
import hamsters from 'hamsters.js';

const MAX_THREADS = 8;

hamsters.init({
    maxThreads: MAX_THREADS
});

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

export const generateGuessAsync = (set, usedCodes, lastGuess, lastGuessFeedback) =>
    usedCodes.length
        ? mainAlgorithmAsync(set, usedCodes, lastGuess, lastGuessFeedback)
        : Promise.resolve({
            guess: INITIAL_GUESS,
            autoSolveSet: set,
            autoSolveUsed: [INITIAL_GUESS]
        });

const mainAlgorithmAsync = (set, usedCodes, lastGuess, lastGuessFeedback) => {

    const filteredSet = set.filter(evaluatesToSameFeedback(lastGuess, lastGuessFeedback));

    if (filteredSet.length === 1) {
        const guess = filteredSet[0];
        return Promise.resolve({
            guess,
            autoSolveSet: filteredSet,
            autoSolveUsed: usedCodes.concat([guess])
        });
    }

    const unusedCodes = initialAutoSolveSet().filter(guess => !usedCodes.find(sameGuessAs(guess)));

    return runParallelSubTasks(filteredSet, unusedCodes)
        .then(guess => ({
            guess,
            autoSolveSet: filteredSet,
            autoSolveUsed: usedCodes.concat([guess])
        }));
};

const runParallelSubTasks = (filteredSet, unusedCodes) => {

    const combineSubTaskResults = subTaskResults =>
        minBy(subTaskResults, x => x.min).guess;

    // Marshal symbols to numbers.
    const params = {
        ALL_OUTCOMES: ALL_OUTCOMES,
        filteredSet: filteredSet.map(marshalPegs),
        array: unusedCodes.map(marshalPegs)
    };

    return new Promise(resolve => {
        hamsters.run(
            params,
            subTask,
            function (subTaskResults) {
                const guessNumbers = combineSubTaskResults(subTaskResults);
                // Unmarshal numbers back to symbols.
                const guessPegs = unmarshalPegs(guessNumbers);
                resolve(guessPegs);
            },
            MAX_THREADS
        );
    });
};

const subTask = () => {

    /* eslint-disable no-undef */
    const hamstersParams = params;
    const hamstersRtn = rtn;
    /* eslint-enable no-undef */

    const ALL_OUTCOMES = hamstersParams.ALL_OUTCOMES;
    const filteredSet = hamstersParams.filteredSet;
    const unusedCodes = hamstersParams.array;

    const evaluateGuess = (secret, guess) => {
        const count = (xs, p) => xs.filter(x => x === p).length;
        const add = (a, b) => a + b;
        // In the context of the hamsters, we are using numbers rather than peg symbols.
        const sum = [0, 1, 2, 3, 4, 5].map(p => Math.min(count(secret, p), count(guess, p))).reduce(add);
        const blacks = secret.filter((peg, index) => peg === guess[index]).length;
        const whites = sum - blacks;
        return { blacks, whites };
    };

    const sameFeedback = (fb1, fb2) =>
        fb1.blacks === fb2.blacks &&
        fb1.whites === fb2.whites;

    const evaluatesToSameFeedback = (code1, feedback) => code2 =>
        sameFeedback(evaluateGuess(code1, code2), feedback);

    const countWithPredicate = (xs, p) =>
        xs.reduce((acc, x) => acc + (p(x) ? 1 : 0), 0);

    const seed = { min: Number.MAX_VALUE };
    hamstersRtn.data = unusedCodes.reduce((currentBest, unusedCode) => {
        const max = ALL_OUTCOMES.reduce((currentMax, outcome) => {
            const count = countWithPredicate(filteredSet, evaluatesToSameFeedback(unusedCode, outcome));
            return Math.max(currentMax, count);
        }, 0);
        return max < currentBest.min ? { min: max, guess: unusedCode } : currentBest;
    }, seed);
};

// When passing data from the 'main' thread to the hamsters, we can't
// send peg symbols so we have to marshal them into numbers.
const marshalPegs = pegs => pegs.map(pegToNumber);
const pegToNumber = peg => {
    switch (peg) {
        case Peg.RED: return 0;
        case Peg.GREEN: return 1;
        case Peg.BLUE: return 2;
        case Peg.YELLOW: return 3;
        case Peg.BLACK: return 4;
        case Peg.WHITE: return 5;
    }
};

// Going the other way, we unmarshal numbers from the hamsters back into peg symbols.
const unmarshalPegs = numbers => numbers.map(numberToPeg);
const numberToPeg = number => {
    switch (number) {
        case 0: return Peg.RED;
        case 1: return Peg.GREEN;
        case 2: return Peg.BLUE;
        case 3: return Peg.YELLOW;
        case 4: return Peg.BLACK;
        case 5: return Peg.WHITE;
    }
};

const minBy = (xs, f) => xs.reduce((acc, x) => f(x) < f(acc) ? x : acc);

const evaluatesToSameFeedback = (code1, feedback) => code2 =>
    sameFeedback(evaluateGuess(code1, code2), feedback);

const sameFeedback = (fb1, fb2) =>
    fb1.blacks === fb2.blacks &&
    fb1.whites === fb2.whites;

const sameGuessAs = g1 => g2 => g1.every((p, i) => p === g2[i]);
