import React from 'react';
import PropTypes from 'prop-types';
import FeedbackPeg from './FeedbackPeg';
import { Peg } from '../constants';

const GuessFeedback = ({
    active,
    autoSolveMode,
    guess,
    onGuess
}) => {
    const unselected = peg => peg === Peg.UNSELECTED;
    const conditionalAttributesSubmit = {};
    if ((guess.code.some(unselected) && !autoSolveMode) || guess.generatingGuess)  {
        conditionalAttributesSubmit.disabled = true;
    }
    const conditionalAttributesSpinner = {};
    if (!guess.generatingGuess) {
        conditionalAttributesSpinner.style = { visibility: 'hidden' };
    }
    const activeContent = () => {
        return (
            <div className="feedbackColumn">
                <button
                    className="btn btn-sm btn-info"
                    {...conditionalAttributesSubmit}
                    onClick={onGuess}
                >
                    Submit
                </button>
                <div
                    className="spinner"
                    {...conditionalAttributesSpinner}
                >
                </div>
            </div>);
    };
    const inactiveContent = () => {
        return guess.feedbackPegs.map((_, index) =>
            <FeedbackPeg
                key={index}
                index={index}
                feedbackPegs={guess.feedbackPegs}
            >
            </FeedbackPeg>);
    };
    return (
        <div className="col-xs-4 col-md-offset-4 col-md-2 feedbackColumn">
            {active ? activeContent() : inactiveContent()}
        </div>
    );
};

GuessFeedback.propTypes = {
    active: PropTypes.bool.isRequired,
    autoSolveMode: PropTypes.bool.isRequired,
    guess: PropTypes.shape({
        code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
        feedbackPegs: PropTypes.arrayOf(PropTypes.symbol).isRequired,
        generatingGuess: PropTypes.bool.isRequired
    }).isRequired,
    onGuess: PropTypes.func.isRequired
};

export default GuessFeedback;
