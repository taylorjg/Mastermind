import React from 'react';
import PropTypes from 'prop-types';

const GuessNumber = ({ index }) => {
    return (
        <div className="col-xs-offset-1 col-xs-1">
            <span>{index + 1}</span>
        </div>
    );
};

GuessNumber.propTypes = {
    index: PropTypes.number.isRequired
};

export default GuessNumber;
