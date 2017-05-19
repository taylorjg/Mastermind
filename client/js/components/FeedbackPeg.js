import React from 'react';
import PropTypes from 'prop-types';
import { FeedbackPeg as FP } from '../constants';

const FeedbackPeg = ({ index, feedbackPegs }) => {
    const feedbackPeg = feedbackPegs[index];
    const src = FEEDBACK_PEG_TO_IMG_SRC[feedbackPeg];
    const alt = FEEDBACK_PEG_TO_IMG_ALT[feedbackPeg];
    return (
        <img
            className='feedbackPeg'
            src={src}
            alt={alt}
        >
        </img>
    );
};

FeedbackPeg.propTypes = {
    index: PropTypes.number.isRequired,
    feedbackPegs: PropTypes.arrayOf(PropTypes.symbol).isRequired
};

const FEEDBACK_PEG_TO_IMG_ALT = {
    [FP.BLACK]: 'black feedback peg',
    [FP.WHITE]: 'white feedback peg'
};

const FEEDBACK_PEG_TO_IMG_SRC = {
    [FP.BLACK]: 'assets/feedback-peg-black.png',
    [FP.WHITE]: 'assets/feedback-peg-white.png'
};

export default FeedbackPeg;
