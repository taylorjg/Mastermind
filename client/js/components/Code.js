import React from 'react';
import PropTypes from 'prop-types';
import Peg from './Peg';

const Code = ({
    readOnly,
    code,
    onAddPegToGuess
}) => {
    return (
        <div>
            <Peg index={0} code={code} onClick={(index, peg) => !readOnly && onAddPegToGuess(index, peg)}></Peg>
            {" "}
            <Peg index={1} code={code} onClick={(index, peg) => !readOnly && onAddPegToGuess(index, peg)}></Peg>
            {" "}
            <Peg index={2} code={code} onClick={(index, peg) => !readOnly && onAddPegToGuess(index, peg)}></Peg>
            {" "}
            <Peg index={3} code={code} onClick={(index, peg) => !readOnly && onAddPegToGuess(index, peg)}></Peg>
        </div>
    );
};

Code.propTypes = {
    readOnly: PropTypes.bool.isRequired,
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
    onAddPegToGuess: PropTypes.func
};

export default Code;
