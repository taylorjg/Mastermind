import React from 'react';
import PropTypes from 'prop-types';
import Code from './Code';
import Shield from './Shield';

const SecretCode = ({ reveal, code }) => {
    return (
        reveal
            ? <Code readOnly={true} code={code}></Code>
            : <Shield></Shield>
    );
};

SecretCode.propTypes = {
    reveal: PropTypes.bool.isRequired,
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired
};

export default SecretCode;
