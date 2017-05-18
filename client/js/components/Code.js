import React from 'react';
import PropTypes from 'prop-types';
import Peg from './Peg';

const Code = ({
    readOnly,
    code,
    onSetPeg
}) => {
    const makePeg = index => (
         <Peg
            index={index}
            code={code}
            onClick={(index, peg) => !readOnly && onSetPeg(index, peg)}
        >
        </Peg>
    );
    return (
        <div>
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
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
    onSetPeg: PropTypes.func
};

export default Code;
