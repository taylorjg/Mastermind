import React from 'react';
import PropTypes from 'prop-types';
import Peg from './Peg';

const Code = ({
    active,
    hide,
    code,
    onSetPeg
}) => {
    const conditionalAttributes = {};
    if (hide) {
        conditionalAttributes.style = { visibility: 'hidden' };
    }
    return (
        <div {...conditionalAttributes}>
            {
                code.map((_, index) =>
                    <Peg
                        key={index}
                        active={active}
                        index={index}
                        code={code}
                        onClick={(index, peg) => active && onSetPeg && onSetPeg(index, peg)}
                    >
                    </Peg>)
            }
        </div>
    );
};

Code.propTypes = {
    active: PropTypes.bool.isRequired,
    hide: PropTypes.bool.isRequired,
    code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
    onSetPeg: PropTypes.func
};

export default Code;
