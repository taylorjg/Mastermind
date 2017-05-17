import React from 'react';
import PropTypes from 'prop-types';

const GuessButtons = ({
    active,
    code,
    onGuess,
    onClear
}) => {
    const definedCount = code.filter(x => !!x).length;
    const conditionalAttributesSubmit = {};
    if (definedCount < 4) {
        conditionalAttributesSubmit.disabled = true;
    }
    const conditionalAttributesClear = {};
    if (!definedCount) {
        conditionalAttributesClear.disabled = true;
    }
    return (
        <div className="col-md-7">
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
