import React from 'react';
import PropTypes from 'prop-types';
import GuessNumber from './GuessNumber';
import GuessFeedback from './GuessFeedback';
import GuessCode from './GuessCode';

const GuessRow = ({
    index,
    active,
    guess,
    onSetPeg,
    onGuess
 }) => {
    return (
        <div className="row boardRow">

            <GuessNumber
                index={index}
            >
            </GuessNumber>

            <GuessFeedback
                active={active}
                feedbackPegs={guess.feedbackPegs}
                code={guess.code}
                onGuess={onGuess}
            >
            </GuessFeedback>

            <GuessCode
                active={active}
                code={guess.code}
                onSetPeg={onSetPeg}
            >
            </GuessCode>
        </div>
    );
};

GuessRow.propTypes = {
    index: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    guess: PropTypes.shape({
        code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
        feedbackPegs: PropTypes.arrayOf(PropTypes.symbol).isRequired
    }).isRequired,
    onSetPeg: PropTypes.func.isRequired,
    onGuess: PropTypes.func.isRequired
};

export default GuessRow;
