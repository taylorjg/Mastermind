import React from 'react';
import PropTypes from 'prop-types';
import Code from './Code';

const GuessCode = ({ active, code, onSetPeg }) => {
    return (
        <div className="col-xs-3 my-centre">
            <Code
                active={active}
                hide={false}
                code={code}
                onSetPeg={onSetPeg}
            >
            </Code>
        </div>
    );
};

GuessCode.propTypes = {
    active: PropTypes.bool.isRequired,
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
    onSetPeg: PropTypes.func
};

export default GuessCode;
