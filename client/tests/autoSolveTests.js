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
        let numAttempts = 0;
        let s = initialAutoSolveSet();
        let used = [];
        let lastGuess = null;
        let lastGuessFeedback = null;
        for (;;) {
            numAttempts++;
            const result = generateGuess(s, used, lastGuess, lastGuessFeedback);
            const guess = result.guess;
            const feedback = evaluateGuess(secret, guess);
            if (feedback.blacks === 4 && feedback.whites === 0) break;
            s = result.autoSolveSet;
            used = result.autoSolveUsed;
            lastGuess = guess;
            lastGuessFeedback = feedback;
        }
        verdict(numAttempts <= 5);
    };

    JSC_it(
        'find the correct solution within 5 attempts',
        propertyTest,
        [JSC.array(4, JSC.one_of(['R', 'G', 'B', 'Y', 'BL', 'WH']))]);
});
