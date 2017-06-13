export default class Guess {

    constructor(code, feedbackPegs, generatingGuess) {
        this.code = code;
        this.feedbackPegs = feedbackPegs;
        this.generatingGuess = generatingGuess || false;
    }

    updateCode(code) {
        return new Guess(code, this.feedbackPegs);
    }

    setGeneratedGuess(code) {
        return new Guess(code, this.feedbackPegs);
    }

    setGeneratingGuess() {
        return new Guess(this.code, this.feedbackPegs, true);
    }

    updateCodePeg(index, peg) {
        const code = [
            ...this.code.slice(0, index),
            peg,
            ...this.code.slice(index + 1)
        ];
        return new Guess(code, this.feedbackPegs);
    }

    updateFeedbackPegs(feedbackPegs) {
        return new Guess(this.code, feedbackPegs);
    }
}
