import React from 'react';
import PropTypes from 'prop-types';
import { Peg } from '../constants';

const GuessButtons = ({
    active,
    code,
    onGuess
}) => {
    const unselected = peg => peg === Peg.UNSELECTED;
    const conditionalAttributesSubmit = {};
    if (code.some(unselected)) {
        conditionalAttributesSubmit.disabled = true;
    }
    return (
        <div className="col-xs-1">
            {
                active &&
                <button
                    className="btn btn-sm btn-info"
                    {...conditionalAttributesSubmit}
                    onClick={() => onGuess(code)}
                >
                    <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>                
                </button>
            }
        </div>
    );
};

GuessButtons.propTypes = {
    active: PropTypes.bool.isRequired,
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
    onGuess: PropTypes.func.isRequired
};

export default GuessButtons;
