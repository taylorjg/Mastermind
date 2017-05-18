import React from 'react';
import PropTypes from 'prop-types';
import Code from './Code';

const GuessCode = ({ readOnly, code, onSetPeg }) => {
    return (
        <div>
            <div className="col-md-3">
                <Code
                    readOnly={readOnly}
                    code={code}
                    onSetPeg={onSetPeg}
                >
                </Code>
            </div>
        </div>
    );
};

GuessCode.propTypes = {
    readOnly: PropTypes.bool.isRequired,
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
    onSetPeg: PropTypes.func
};

export default GuessCode;
