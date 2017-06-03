import React from 'react';
import PropTypes from 'prop-types';
import FeedbackPeg from './FeedbackPeg';
import { Peg } from '../constants';

const GuessFeedback = ({
    active,
    autoSolveMode,
    feedbackPegs,
    code,
    onGuess
}) => {
    const unselected = peg => peg === Peg.UNSELECTED;
    const conditionalAttributesSubmit = {};
    if (code.some(unselected) && !autoSolveMode) {
        conditionalAttributesSubmit.disabled = true;
    }
    return (
        <div className="col-xs-1">
            {
                active
                    ? <button
                        className="btn btn-sm btn-info"
                        {...conditionalAttributesSubmit}
                        onClick={onGuess}
                    >
                        <span className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
                    </button>
                    : feedbackPegs.map((_, index) =>
                        <FeedbackPeg
                            key={index}
                            index={index}
                            feedbackPegs={feedbackPegs}
                        >
                        </FeedbackPeg>)
            }
        </div>
    );
};

GuessFeedback.propTypes = {
    active: PropTypes.bool.isRequired,
    autoSolveMode: PropTypes.bool.isRequired,
    feedbackPegs: PropTypes.arrayOf(PropTypes.symbol).isRequired,
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
    onGuess: PropTypes.func.isRequired
};

export default GuessFeedback;
