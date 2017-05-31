import React from 'react';
import PropTypes from 'prop-types';
import FeedbackPeg from './FeedbackPeg';

const GuessFeedback = ({ feedbackPegs }) => {
    return (
        <div className="col-xs-3">
            {
                feedbackPegs.map((_, index) =>
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
    feedbackPegs: PropTypes.arrayOf(PropTypes.symbol).isRequired
};

export default GuessFeedback;
