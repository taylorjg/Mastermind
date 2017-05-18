import React from 'react';
import PropTypes from 'prop-types';
import { FeedbackPeg as FP } from '../constants';
import FeedbackPeg from './FeedbackPeg';

const GuessFeedback = ({ feedback }) => {
    const feedbackPegs = [].concat(
        Array(feedback.blacks).fill(FP.BLACK),
        Array(feedback.whites).fill(FP.WHITE),
        Array(4 - feedback.blacks - feedback.whites).fill(FP.NONE)
    );
    return (
        <div className="col-md-2">
            {
                feedbackPegs.map((fp, index) =>
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
    feedback: PropTypes.shape({
        blacks: PropTypes.number.isRequired,
        whites: PropTypes.number.isRequired
    }).isRequired
};

export default GuessFeedback;
