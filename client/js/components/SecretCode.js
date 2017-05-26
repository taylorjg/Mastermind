import React from 'react';
import PropTypes from 'prop-types';
import Code from './Code';

const SecretCode = ({ reveal, code }) => {
    const conditionalAttributes = {};
    if (!reveal) {
        conditionalAttributes.style = {
            background: 'url("assets/logo.jpeg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center'
        };
    }
    return (
        <div className="col-md-3" {...conditionalAttributes}>
            <Code active={false} hide={!reveal} code={code}></Code>
        </div>
    );
};

SecretCode.propTypes = {
    reveal: PropTypes.bool.isRequired,
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired
};

export default SecretCode;
