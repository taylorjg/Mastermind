import React from 'react';
import PropTypes from 'prop-types';

const GuessFeedback = ({ feedback }) => {
    return (
        <div className="col-md-1">
            {
                Array.from(Array(feedback.blacks).keys()).map((_, index) =>
                    <span key={index}>B</span>)
            }
            {
                Array.from(Array(feedback.whites).keys()).map((_, index) =>
                    <span key={index}>W</span>)
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
