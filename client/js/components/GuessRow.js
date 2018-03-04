import React from 'react';
import PropTypes from 'prop-types';
import GuessFeedback from './GuessFeedback';
import GuessCode from './GuessCode';

const GuessRow = ({
    active,
    autoSolveMode,
    guess,
    onSetPeg,
    onGuess
 }) => {
    return (
        <div className="row boardRow">

            <GuessFeedback
                active={active}
                autoSolveMode={autoSolveMode}
                guess={guess}
                onGuess={onGuess}
            >
            </GuessFeedback>

            <GuessCode
                active={active && !autoSolveMode}
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
    autoSolveMode: PropTypes.bool.isRequired,
    guess: PropTypes.shape({
        code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
        feedbackPegs: PropTypes.arrayOf(PropTypes.symbol).isRequired,
        generatingGuess: PropTypes.bool.isRequired
    }).isRequired,
    onSetPeg: PropTypes.func.isRequired,
    onGuess: PropTypes.func.isRequired
};

export default GuessRow;
