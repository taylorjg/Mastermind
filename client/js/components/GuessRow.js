import React from 'react';
import PropTypes from 'prop-types';
import GuessNumber from './GuessNumber';
import GuessFeedback from './GuessFeedback';
import GuessCode from './GuessCode';
import GuessButtons from './GuessButtons';

const GuessRow = ({
    index,
    guess,
    onSetPeg,
    onGuess,
    onClear
 }) => {
    return (
        <div className="row">

            <GuessNumber index={index}></GuessNumber>
            <GuessFeedback feedbackPegs={guess.feedbackPegs}></GuessFeedback>

            <GuessCode
                readOnly={!guess.active}
                code={guess.code}
                onSetPeg={onSetPeg}
            >
            </GuessCode>
            
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
    index: PropTypes.number.isRequired,
    guess: PropTypes.shape({
        active: PropTypes.bool.isRequired,
        code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
        feedbackPegs: PropTypes.arrayOf(PropTypes.symbol).isRequired
    }).isRequired,
    onSetPeg: PropTypes.func.isRequired,
    onGuess: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired
};

export default GuessRow;
