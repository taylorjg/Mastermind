import 'babel-polyfill';
import jsc from 'jsverify';
import { initialAutoSolveSet, generateGuessAsync, evaluateGuess } from '../js/logic';
import { Peg as P } from '../js/constants';

const autoSolveAsync = secret => {

    const loopAsync = state =>
        generateGuessAsync(state.autoSolveSet, state.autoSolveUsed, state.lastGuess, state.lastGuessFeedback)
            .then(result => {
                const feedback = evaluateGuess(secret, result.guess);
                return (feedback.blacks === 4 && feedback.whites === 0)
                    ? state.numAttempts
                    : loopAsync({
                        autoSolveSet: result.autoSolveSet,
                        autoSolveUsed: result.autoSolveUsed,
                        lastGuess: result.guess,
                        lastGuessFeedback: feedback,
                        numAttempts: state.numAttempts + 1
                    });
            });

    const promise = loopAsync({
        autoSolveSet: initialAutoSolveSet(),
        autoSolveUsed: [],
        lastGuess: null,
        lastGuessFeedback: null,
        numAttempts: 1
    });
    
    return promise.then(numAttempts => numAttempts <= 5);
};

describe('autoSolve', () => {

    const MS_PER_TEST = 30 * 1000;

    const opts = {
        tests: 10
    };

    const arbPeg = jsc.elements([P.RED, P.GREEN, P.BLUE, P.YELLOW, P.BLACK, P.WHITE]);
    const arbSecret = jsc.nonshrink(jsc.tuple([arbPeg, arbPeg, arbPeg, arbPeg]));
    arbSecret.show = pegs => pegs.toString();

    it('finds the correct solution within 5 attempts', () => {
        const prop = jsc.forall(arbSecret, autoSolveAsync);
        jsc.check(prop, opts);
    }).timeout(MS_PER_TEST * opts.tests);
});
