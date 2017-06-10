import 'babel-polyfill';
import jsc from 'jsverify';
import { initialAutoSolveSet, generateGuess, evaluateGuess } from '../js/logic';
import { Peg as P } from '../js/constants';

const autoSolve = secret => {

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
        tests: 1
    };

    it('finds the correct solution within 5 attempts', () => {
        const arbPeg = jsc.elements([P.RED, P.GREEN, P.BLUE, P.YELLOW, P.BLACK, P.WHITE]);
        const arbSecret = jsc.tuple([arbPeg, arbPeg, arbPeg, arbPeg]);
        const prop = jsc.forall(arbSecret, autoSolve);
        jsc.check(prop, opts);
    }).timeout(MS_PER_TEST * opts.tests);
});
