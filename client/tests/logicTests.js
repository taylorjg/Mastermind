import 'babel-polyfill';
import { expect } from 'chai';
import { evaluateGuess, initialAutoSolveSet, generateGuessAsync } from '../js/logic';
import { Peg } from '../js/constants';

const R = Peg.RED;
const G = Peg.GREEN;
const B = Peg.BLUE;
const Y = Peg.YELLOW;
const BL = Peg.BLACK;
const WH = Peg.WHITE;

describe('logic', () => {

    it('evaluateGuess with no overlap at all', () => {
        const actual = evaluateGuess([R, G, B, Y], [BL, BL, WH, WH]);
        expect(actual.blacks).to.equal(0);
        expect(actual.whites).to.equal(0);
    });

    it('evaluateGuess with exact match', () => {
        const actual = evaluateGuess([R, G, B, Y], [R, G, B, Y]);
        expect(actual.blacks).to.equal(4);
        expect(actual.whites).to.equal(0);
    });

    it('evaluateGuess with all correct colours but all wrong positions', () => {
        const actual = evaluateGuess([R, G, B, Y], [Y, B, G, R]);
        expect(actual.blacks).to.equal(0);
        expect(actual.whites).to.equal(4);
    });

    it('evaluateGuess with specific scenario 1', () => {
        const actual = evaluateGuess([G, G, B, B], [B, B, G, G]);
        expect(actual.blacks).to.equal(0);
        expect(actual.whites).to.equal(4);
    });

    it('evaluateGuess with specific scenario 2', () => {
        const actual = evaluateGuess([G, G, B, B], [B, B, G, Y]);
        expect(actual.blacks).to.equal(0);
        expect(actual.whites).to.equal(3);
    });

    it('evaluateGuess with specific scenario 3', () => {
        const actual = evaluateGuess([G, G, B, Y], [B, B, G, G]);
        expect(actual.blacks).to.equal(0);
        expect(actual.whites).to.equal(3);
    });

    it('evaluateGuess with specific scenario 4', () => {
        const actual = evaluateGuess([B, Y, WH, WH], [B, WH, Y, Y]);
        expect(actual.blacks).to.equal(1);
        expect(actual.whites).to.equal(2);
    });

    it('initialAutoSolveSet', () => {
        const actual = initialAutoSolveSet();
        expect(actual).to.have.length.of(6 * 6 * 6 * 6);
    });

    it('generateGuessAsync with no previous guesses', done => {
        const autoSolveSet = initialAutoSolveSet();
        const autoSolveUsed = [];
        const lastGuess = null;
        const lastGuessFeedback = null;
        generateGuessAsync(autoSolveSet, autoSolveUsed, lastGuess, lastGuessFeedback)
            .then(actual => {
                expect(actual.guess).to.deep.equal([R, R, G, G]);
                expect(actual.autoSolveSet).to.deep.equal(autoSolveSet);
                expect(actual.autoSolveUsed).to.deep.equal([[R, R, G, G]]);
                done();
            });
    });
});
