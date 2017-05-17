import React from 'react';
import PropTypes from 'prop-types';
import { PegColours } from '../constants';

const DEFAULT = "-";

const Peg = ({ index, code, onClick }) => {
    const peg = code[index];
    return (
        <span onClick={() => onClick && onClick(index, PEG_TO_NEXT_PEG[peg] || PegColours.RED)}>
            {PEG_TO_COLOUR_NAME[peg] || DEFAULT}
        </span>
    );
};

Peg.propTypes = {
    index: PropTypes.number.isRequired,
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
    onClick: PropTypes.func.isRequired
};

const PEG_TO_COLOUR_NAME = {
    [PegColours.RED]: 'red',
    [PegColours.GREEN]: 'green',
    [PegColours.BLUE]: 'blue',
    [PegColours.YELLOW]: 'yellow',
    [PegColours.BLACK]: 'black',
    [PegColours.WHITE]: 'white'
};

const PEG_TO_NEXT_PEG = {
    [PegColours.RED]: PegColours.GREEN,
    [PegColours.GREEN]: PegColours.BLUE,
    [PegColours.BLUE]: PegColours.YELLOW,
    [PegColours.YELLOW]: PegColours.BLACK,
    [PegColours.BLACK]: PegColours.WHITE,
    [PegColours.WHITE]: PegColours.RED
};

export default Peg;
