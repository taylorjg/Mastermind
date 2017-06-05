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
    const blacks = secret.filter((peg, index) => peg === guess[index]).length;
    const count = (xs, p) => xs.filter(x => x === p).length;
    const add = (a, b) => a + b;
    const sum = PEGS.map(p => Math.min(count(secret, p), count(guess, p))).reduce(add);
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

export const generateGuess = (s, used, code, feedback) =>
    used.length
        ? mainAlgorithm(s, used, code, feedback)
        : {
            guess: INITIAL_GUESS,
            autoSolveSet: s,
            autoSolveUsed: [INITIAL_GUESS]
        };

const mainAlgorithm = (s, usedCodes, lastGuess, lastGuessFeedback) => {

    const s2 = s.filter(evaluatesToSameFeedback(lastGuess, lastGuessFeedback));
    const unusedCodes = initialAutoSolveSet().filter(guess => !usedCodes.find(sameGuessAs(guess)));

    console.log(`s.length: ${s.length}; s2.length: ${s2.length}; usedCodes.length: ${usedCodes.length}; unusedCodes.length: ${unusedCodes.length}`);
    dumpFeedback(lastGuessFeedback);

    if (s2.length === 1) {
        const guess = s2[0];
        return {
            guess,
            autoSolveSet: s2,
            autoSolveUsed: usedCodes.concat(guess)
        };
    }

    let min = Number.MAX_VALUE;
    let guess = null;

    unusedCodes.forEach(u => {
        let max = 0;
        ALL_OUTCOMES.forEach(outcome => {
            let count = 0;
            s2.forEach(g => {
                const fb = evaluateGuess(g, u);
                if (sameFeedback(outcome, fb)) {
                    count++;
                }
            });
            if (count > max)
                max = count;
        });
        if (max < min) {
            min = max;
            guess = u;
        }
    });

    dumpCode('guess', guess);

    return {
        guess,
        autoSolveSet: s2,
        autoSolveUsed: usedCodes.concat([guess])
    };
};

const evaluatesToSameFeedback = (code, feedback) => s =>
    sameFeedback(evaluateGuess(s, code), feedback);

const sameFeedback = (fb1, fb2) =>
    fb1.blacks === fb2.blacks &&
    fb1.whites === fb2.whites;

const sameGuessAs = g1 => g2 => g1.every((p, i) => p === g2[i]);

/* ---------------------------------------------------------------------- */

const dumpCode = (label, code) => {
    console.log(`${label}: ${pegsToString(code)}`);
};

const pegsToString = pegs => `[${pegs.map(pegToString).join(', ')}]`;

const pegToString = peg => {
    switch (peg) {
        case Peg.RED: return 'R';
        case Peg.GREEN: return 'G';
        case Peg.BLUE: return 'B';
        case Peg.YELLOW: return 'Y';
        case Peg.BLACK: return 'BL';
        case Peg.WHITE: return 'WH';
        default: return '?';
    }
};

const dumpFeedback = feedback => {
    console.log(`feedback: ${blacksToString(feedback)}${whitesToString(feedback)}`);
};

const blacksToString = feedback => Array(feedback.blacks).fill('B').join('');
const whitesToString = feedback => Array(feedback.whites).fill('W').join('');
