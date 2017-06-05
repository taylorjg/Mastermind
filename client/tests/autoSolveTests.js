import 'babel-polyfill';
import jsc from 'jsverify';
import { initialAutoSolveSet, generateGuess, evaluateGuess } from '../js/logic';
import { Peg } from '../js/constants';

const stringsToPegs = strings => strings.map(stringToPeg);

const stringToPeg = string => {
    switch (string) {
        case 'R': return Peg.RED;
        case 'G': return Peg.GREEN;
        case 'B': return Peg.BLUE;
        case 'Y': return Peg.YELLOW;
        case 'BL': return Peg.BLACK;
        case 'WH': return Peg.WHITE;
        default: throw new Error(`Unknown peg colour, "${string}".`);
    }
};

const autoSolve = strings => {

    const secret = stringsToPegs(strings);

    const loop = state => {
        const result = generateGuess(state.autoSolveSet, state.autoSolveUsed, state.lastGuess, state.lastGuessFeedback);
        const feedback = evaluateGuess(secret, result.guess);
        return (feedback.blacks === 4 && feedback.whites === 0)
            ? state.numAttempts
            : loop({
                autoSolveSet: result.autoSolveSet,
                autoSolveUsed: result.autoSolveUsed,
                lastGuess: result.guess,
                lastGuessFeedback: feedback,
                numAttempts: state.numAttempts + 1
            });
    };

    const numAttempts = loop({
        autoSolveSet: initialAutoSolveSet(),
        autoSolveUsed: [],
        lastGuess: null,
        lastGuessFeedback: null,
        numAttempts: 1
    });

    return numAttempts <= 5;
};

describe('autoSolve', () => {

    const MS_PER_TEST = 30 * 1000;

    const opts = {
        tests: 10
    };

    it('finds the correct solution within 5 attempts', () => {
        const arbPeg = jsc.oneof([
            jsc.constant('R'),
            jsc.constant('G'),
            jsc.constant('B'),
            jsc.constant('Y'),
            jsc.constant('BL'),
            jsc.constant('WH')]);
        const arbSecret = jsc.tuple([arbPeg, arbPeg, arbPeg, arbPeg]);
        const prop = jsc.forall(arbSecret, autoSolve);
        jsc.check(prop, opts);
    }).timeout(MS_PER_TEST * opts.tests);
});
