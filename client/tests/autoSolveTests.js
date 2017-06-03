import 'babel-polyfill';
import JSC from 'jscheck';
import { initialAutoSolveSet, generateGuess, evaluateGuess } from '../js/logic';
import { Peg } from '../js/constants';

const JSC_it = (name, predicate, signature) => {
    it(name, done => {

        let ok = true;

        JSC.on_result(result => {
            if (result.ok) {
                done();
            } else {
                ok = false;
                done(new Error('Property test failure'));
            }
        });

        JSC.on_report(s => {
            if (!ok) {
                console.error(s);
            }
        });

        JSC.check(JSC.claim(name, predicate, signature));
    });
};

const stringsToPegs = ss => ss.map(stringToPeg);

const stringToPeg = s => {
    switch (s) {
        case 'R': return Peg.RED;
        case 'G': return Peg.GREEN;
        case 'B': return Peg.BLUE;
        case 'Y': return Peg.YELLOW;
        case 'BL': return Peg.BLACK;
        case 'WH': return Peg.WHITE;
        default: throw new Error(`Unknown peg, ${s}.`);
    }
};

describe('autosolve', () => {

    const propertyTest = (verdict, ss) => {

        const secret = stringsToPegs(ss);

        const loop = state => {
            const result = generateGuess(state.autoSolveSet, state.autoSolveUsed, state.lastGuess, state.lastGuessFeedback);
            const guess = result.guess;
            const feedback = evaluateGuess(secret, guess);
            if (feedback.blacks === 4 && feedback.whites === 0) {
                return state.numAttempts;
            } else {
                return loop({
                    autoSolveSet: result.autoSolveSet,
                    autoSolveUsed: result.autoSolveUsed,
                    lastGuess: guess,
                    lastGuessFeedback: feedback,
                    numAttempts: state.numAttempts + 1
                });
            }
        };

        const numAttempts = loop({
            autoSolveSet: initialAutoSolveSet(),
            autoSolveUsed: [],
            lastGuess: null,
            lastGuessFeedback: null,
            numAttempts: 1
        });

        verdict(numAttempts <= 5);
    };

    JSC_it(
        'find the correct solution within 5 attempts',
        propertyTest,
        [JSC.array(4, JSC.one_of(['R', 'G', 'B', 'Y', 'BL', 'WH']))]);
});
