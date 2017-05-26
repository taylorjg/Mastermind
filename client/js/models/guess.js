export default class Guess {

    constructor(code, feedbackPegs) {
        this.code = code;
        this.feedbackPegs = feedbackPegs;
    }

    updateCode(code) {
        return new Guess(code, this.feedbackPegs);
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
