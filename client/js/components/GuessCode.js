import React from 'react';
import PropTypes from 'prop-types';
import { PegColours } from '../constants';

const GuessCode = ({ code }) => {
    return (
        <div>
            <div className="col-md-4">
                <span>{ SYMBOL_TO_COLOUR[code[0]] }</span>
                {" "}
                <span>{ SYMBOL_TO_COLOUR[code[1]] }</span>
                {" "}
                <span>{ SYMBOL_TO_COLOUR[code[2]] }</span>
                {" "}
                <span>{ SYMBOL_TO_COLOUR[code[3]] }</span>
            </div>
        </div>
    );
};

GuessCode.propTypes = {
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired
};

const SYMBOL_TO_COLOUR = {
    [PegColours.RED]: 'red',
    [PegColours.GREEN]: 'green',
    [PegColours.BLUE]: 'blue',
    [PegColours.YELLOW]: 'yellow',
    [PegColours.BLACK]: 'black',
    [PegColours.WHITE]: 'white'
};

export default GuessCode;
