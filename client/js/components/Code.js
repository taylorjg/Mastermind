import React from 'react';
import PropTypes from 'prop-types';
import Peg from './Peg';

const Code = ({
    readOnly,
    hide,
    code,
    onSetPeg
}) => {
    const conditionalAttributes = {};
    if (hide) {
        conditionalAttributes.style = { visibility: 'hidden' };
    }
    const makePeg = index => (
         <Peg
            index={index}
            code={code}
            onClick={(index, peg) => !readOnly && onSetPeg(index, peg)}
        >
        </Peg>
    );
    return (
        <div {...conditionalAttributes}>
            {makePeg(0)}
            {" "}
            {makePeg(1)}
            {" "}
            {makePeg(2)}
            {" "}
            {makePeg(3)}
        </div>
    );
};

Code.propTypes = {
    readOnly: PropTypes.bool.isRequired,
    hide: PropTypes.bool.isRequired,
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
    onSetPeg: PropTypes.func
};

export default Code;
