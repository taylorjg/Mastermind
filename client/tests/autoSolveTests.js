import 'babel-polyfill';
import JSC from 'jscheck';
import JSC_it from './JSC_it';
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

describe('autosolve', () => {

    const propertyTest = (verdict, strings) => {

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

        verdict(numAttempts <= 5);
    };

    JSC_it(
        'finds the correct solution within 5 attempts',
        propertyTest,
        [JSC.array(4, JSC.one_of(['R', 'G', 'B', 'Y', 'BL', 'WH']))],
        10,
        30 * 1000);
});
