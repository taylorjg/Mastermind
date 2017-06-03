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
    const blacks = zipped.filter(([a, b]) => a === b).length;
    const count = (xs, p) => xs.filter(x => x === p).length;
    const add = (a, b) => a + b;
    const sum = PEGS.map(p => Math.min(count(secret, p), count(guess, p))).reduce(add);
    const whites = sum - blacks;
    return { blacks, whites };
};

const ALL_COMBINATIONS = Array.from(function* () {
        for (const a of PEGS)
        for (const b of PEGS)
        for (const c of PEGS)
        for (const d of PEGS)
        yield [a, b, c, d];
    }());

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

// const ALL_FEEDBACKS =
//     Array.from(function* () {
//         for (const blacks of [0, 1, 2, 3, 4])
//         for (const whites of [0, 1, 2, 3, 4])
//         yield { blacks, whites };
//     }())
//     .filter(fb => fb.blacks + fb.whites <= 4)
//     .filter(fb => !(fb.blacks === 3 && fb.whites === 1));

const mainAlgorithm = (s, used, code, feedback) => {
    const s2 = s.filter(hasSameFeedbackAs(code, feedback));
    
    // TODO: temp logic (seems to work pretty well though!).
    const guess = s2[0];

    // if first:
    // 		guess = 'AABB'
    // 	elif len(secrets) == 1:
    // 		guess = secrets.pop()
    // 	else:
    // 		guess = max(possible, key=lambda x: min(sum(1 for s in secrets if score(s, x) != res) for res in results))    

    // const unused = initialAutoSolveSet().filter(x => used.includes(x));

    return {
        guess,
        autoSolveSet: s2,
        autoSolveUsed: used.concat([guess])
    };
};

const hasSameFeedbackAs = (code, feedback) => s => {
    const feedback2 = evaluateGuess(s, code);
    return feedback.blacks === feedback2.blacks && feedback.whites === feedback2.whites;
};

// const notSameGuessAs = g1 => g2 => g1.some((p, i) => p !== g2[i]);
// const sameGuessAs = g1 => g2 => g1.every((p, i) => p === g2[i]);
