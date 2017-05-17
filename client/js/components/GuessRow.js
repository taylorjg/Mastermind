import React from 'react';
import PropTypes from 'prop-types';
import GuessFeedback from './GuessFeedback';
import GuessCode from './GuessCode';
import GuessButtons from './GuessButtons';

const GuessRow = ({
    guess,
    onGuess,
    onClear
 }) => {
    return (
        <div className="row">
            <GuessFeedback feedback={guess.feedback}></GuessFeedback>
            <GuessCode code={guess.code}></GuessCode>
            <GuessButtons
                active={guess.active}
                code={guess.code}
                onGuess={onGuess}
                onClear={onClear}
            >
            </GuessButtons>
        </div>
    );
};

GuessRow.propTypes = {
    guess: PropTypes.shape({
        active: PropTypes.bool.isRequired,
        code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
        feedback: PropTypes.shape({
            blacks: PropTypes.number.isRequired,
            whites: PropTypes.number.isRequired
        }).isRequired
    }).isRequired,
    onGuess: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired
};

export default GuessRow;
