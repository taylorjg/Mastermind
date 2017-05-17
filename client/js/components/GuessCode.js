import React from 'react';
import PropTypes from 'prop-types';
import Code from './Code';

const GuessCode = ({ readOnly, code, onAddPegToGuess }) => {
    return (
        <div>
            <div className="col-md-4">
                <Code
                    readOnly={readOnly}
                    code={code}
                    onAddPegToGuess={onAddPegToGuess}
                >
                </Code>
            </div>
        </div>
    );
};

GuessCode.propTypes = {
    readOnly: PropTypes.bool.isRequired,
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
    onAddPegToGuess: PropTypes.func
};

export default GuessCode;
