import React from 'react';
import PropTypes from 'prop-types';
import Code from './Code';

const GuessCode = ({ code }) => {
    return (
        <div>
            <div className="col-md-4">
                <Code code={code}></Code>
            </div>
        </div>
    );
};

GuessCode.propTypes = {
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired
};

export default GuessCode;
