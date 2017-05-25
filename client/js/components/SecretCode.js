import React from 'react';
import PropTypes from 'prop-types';
import Code from './Code';

const SecretCode = ({ reveal, code }) => {
    return (
        <div className="col-md-3">
            { reveal && <Code readOnly={true} code={code}></Code> }
        </div>
    );
};

SecretCode.propTypes = {
    reveal: PropTypes.bool.isRequired,
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired
};

export default SecretCode;
