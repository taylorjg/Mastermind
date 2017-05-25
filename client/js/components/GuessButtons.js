import React from 'react';
import PropTypes from 'prop-types';
import { Peg } from '../constants';

const GuessButtons = ({
    active,
    code,
    onGuess,
    onClear
}) => {
    const unselected = peg => peg === Peg.UNSELECTED;
    const conditionalAttributesSubmit = {};
    if (code.some(unselected)) {
        conditionalAttributesSubmit.disabled = true;
    }
    const conditionalAttributesClear = {};
    if (code.every(unselected)) {
        conditionalAttributesClear.disabled = true;
    }
    return (
        <div className="col-md-3">
            {
                active &&
                <button
                    className="btn btn-sm btn-info"
                    {...conditionalAttributesSubmit}
                    onClick={() => onGuess(code)}
                >Submit
                </button>
            }
            {
                active &&
                <button
                    className="btn btn-sm btn-danger"
                    {...conditionalAttributesClear}
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
