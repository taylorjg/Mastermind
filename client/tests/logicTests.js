import { expect } from 'chai';
import { evaluateGuess } from '../js/logic';
import { Peg } from '../js/constants';

const R = Peg.RED;
const G = Peg.GREEN;
const B = Peg.BLUE;
const Y = Peg.YELLOW;
const BL = Peg.BLACK;
const WH = Peg.WHITE;

describe('logic', () => {

    it('no overlap at all', () => {
        const actual = evaluateGuess([R, G, B, Y], [BL, BL, WH, WH]);
        expect(actual.blacks).to.equal(0);
        expect(actual.whites).to.equal(0);
    });

    it('exact match', () => {
        const actual = evaluateGuess([R, G, B, Y], [R, G, B, Y]);
        expect(actual.blacks).to.equal(4);
        expect(actual.whites).to.equal(0);
    });

    it('all correct colours but all wrong positions', () => {
        const actual = evaluateGuess([R, G, B, Y], [Y, B, G, R]);
        expect(actual.blacks).to.equal(0);
        expect(actual.whites).to.equal(4);
    });

    it('tricky 1', () => {
        const actual = evaluateGuess([G, G, B, B], [B, B, G, G]);
        expect(actual.blacks).to.equal(0);
        expect(actual.whites).to.equal(4);
    });

    it('tricky 2', () => {
        const actual = evaluateGuess([G, G, B, B], [B, B, G, Y]);
        expect(actual.blacks).to.equal(0);
        expect(actual.whites).to.equal(3);
    });

    it('tricky 3', () => {
        const actual = evaluateGuess([G, G, B, Y], [B, B, G, G]);
        expect(actual.blacks).to.equal(0);
        expect(actual.whites).to.equal(3);
    });
});
