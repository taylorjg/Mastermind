import React from 'react';
import PropTypes from 'prop-types';

const GuessButtons = ({
    active,
    code,
    onGuess,
    onClear
}) => {
    const conditionalAttributes1 = {};
    if (code.length != 4) {
        conditionalAttributes1.disabled = true;
    }
    const conditionalAttributes2 = {};
    if (code.length) {
        conditionalAttributes2.disabled = true;
    }
    return (
        <div className="col-md-7">
            {
                active &&
                <button
                    className="btn btn-sm btn-info"
                    {...conditionalAttributes1}
                    onClick={code => onGuess(code)}
                >Submit
            </button>
            }
            {
                active &&
                <button
                    className="btn btn-sm btn-danger"
                    {...conditionalAttributes1}
                    onClick={onClear}
                >Clear
            </button>
            }
        </div>
    );
};

GuessButtons.propTypes = {
    active: PropTypes.bool.isRequired,
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
    onGuess: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired
};

export default GuessButtons;
