import React from 'react';
import PropTypes from 'prop-types';

const SecretCode = () => {
    return (
        <img src="assets/logo.jpeg" alt="logo"></img>
    );
};

SecretCode.propTypes = {
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired
};

export default SecretCode;
