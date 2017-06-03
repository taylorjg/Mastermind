import 'babel-polyfill';
import JSC from 'jscheck';
// import { initialAutoSolveSet, generateGuess } from '../js/logic';
import { Peg } from '../js/constants';

const PEGS = [
    Peg.RED,
    Peg.GREEN,
    Peg.BLUE,
    Peg.YELLOW,
    Peg.BLACK,
    Peg.WHITE
];

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

// const pegsToString = pegs => `[${pegs.map(pegToString).join(', ')}]`;

// const pegToString = peg => {
//     switch (peg) {
//         case Peg.RED: return 'R';
//         case Peg.GREEN: return 'G';
//         case Peg.BLUE: return 'B';
//         case Peg.YELLOW: return 'Y';
//         case Peg.BLACK: return 'BL';
//         case Peg.WHITE: return 'WH';
//         default: return '?';
//     }
// };

describe('autosolve', () => {

    const propertyTest = (verdict, secret) => {
        verdict(secret.length === 4);
    };

    JSC_it('find the correct solution within 5 attempts', propertyTest, [JSC.array(4, JSC.one_of(PEGS))]);
});
