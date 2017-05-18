import React from 'react';
import PropTypes from 'prop-types';
import { Peg as P } from '../constants';

const Peg = ({ index, code, onClick }) => {
    const peg = code[index];
    const src = PEG_TO_IMG_SRC[peg];
    const alt = PEG_TO_COLOUR_NAME[peg];
    return (
        <img
            className='peg'
            src={src}
            alt={alt}
            onClick={() => onClick && onClick(index, PEG_TO_NEXT_PEG[peg])}
        >
        </img>);
};

Peg.propTypes = {
    index: PropTypes.number.isRequired,
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
    onClick: PropTypes.func.isRequired
};

const PEG_TO_COLOUR_NAME = {
    [P.UNSELECTED]: 'unselected',
    [P.RED]: 'red',
    [P.GREEN]: 'green',
    [P.BLUE]: 'blue',
    [P.YELLOW]: 'yellow',
    [P.BLACK]: 'black',
    [P.WHITE]: 'white'
};

const PEG_TO_IMG_SRC = {
    [P.UNSELECTED]: 'assets/peg-grey.png',
    [P.RED]: 'assets/peg-red.png',
    [P.GREEN]: 'assets/peg-green.png',
    [P.BLUE]: 'assets/peg-blue.png',
    [P.YELLOW]: 'assets/peg-yellow.png',
    [P.BLACK]: 'assets/peg-black.png',
    [P.WHITE]: 'assets/peg-white.png'
};

const PEG_TO_NEXT_PEG = {
    [P.UNSELECTED]: P.RED,
    [P.RED]: P.GREEN,
    [P.GREEN]: P.BLUE,
    [P.BLUE]: P.YELLOW,
    [P.YELLOW]: P.BLACK,
    [P.BLACK]: P.WHITE,
    [P.WHITE]: P.RED
};

export default Peg;
