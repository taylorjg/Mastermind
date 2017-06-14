import jsc from 'jsverify';
import { initialAutoSolveSet, generateGuessAsync, evaluateGuess } from '../js/logic';
import { Peg } from '../js/constants';

const stringsToSecret = strings => strings.map(stringToPeg);
const stringToPeg = string => {
    switch (string) {
        case "R": return Peg.RED;
        case "G": return Peg.GREEN;
        case "B": return Peg.BLUE;
        case "Y": return Peg.YELLOW;
        case "BL": return Peg.BLACK;
        case "WH": return Peg.WHITE;
    }
};

const autoSolveAsync = strings => {

    const secret = stringsToSecret(strings);
    console.log(`secret: ${strings}`);

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

    const MS_PER_TEST = 6 * 1000;

    const opts = {
        tests: 100
    };

    const arbPeg = jsc.elements(["R", "G", "B", "Y", "BL", "WH"]);
    const arbSecret = jsc.nonshrink(jsc.tuple([arbPeg, arbPeg, arbPeg, arbPeg]));

    it('finds the correct solution within 5 attempts', () => {
        const prop = jsc.forall(arbSecret, autoSolveAsync);
        return jsc.check(prop, opts);
    }).timeout(MS_PER_TEST * opts.tests);
});
