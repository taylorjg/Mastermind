import React from 'react';
import PropTypes from 'prop-types';
import GuessFeedback from './GuessFeedback';
import GuessCode from './GuessCode';
import GuessButtons from './GuessButtons';

const GuessRow = ({ guess }) => {
    return (
        <div className="row">
            <GuessFeedback feedback={guess.feedback}></GuessFeedback>
            <GuessCode code={guess.code}></GuessCode>
            <GuessButtons></GuessButtons>
        </div>
    );
};

GuessRow.propTypes = {
    guess: PropTypes.shape({
        code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
        feedback: PropTypes.shape({
            blacks: PropTypes.number.isRequired,
            whites: PropTypes.number.isRequired
        }).isRequired
    }).isRequired
};

export default GuessRow;
