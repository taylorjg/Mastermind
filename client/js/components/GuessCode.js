import React from 'react';
import PropTypes from 'prop-types';
import Code from './Code';

const GuessCode = ({ active, code, onSetPeg }) => {
    return (
        <div className="col-xs-8 col-md-3">
            <div className="guessCode">
                <Code
                    active={active}
                    hide={false}
                    code={code}
                    onSetPeg={onSetPeg}
                >
                </Code>
            </div>
        </div>
    );
};

GuessCode.propTypes = {
    active: PropTypes.bool.isRequired,
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
    onSetPeg: PropTypes.func
};

export default GuessCode;
