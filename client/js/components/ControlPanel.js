import React from 'react';
import PropTypes from 'prop-types';
import { GameState } from '../constants';

const ControlPanel = ({ gameState, onStart }) => {
    const conditionalAttributes = {};
    if (gameState === GameState.IN_PROGRESS) {
        conditionalAttributes.style = { visibility: 'hidden' };
    }
    return (
        <button
            className="btn btn-sm btn-primary"
            onClick={onStart}
            {...conditionalAttributes}
        >
            Start
        </button>
    );
};

ControlPanel.propTypes = {
    gameState: PropTypes.symbol.isRequired,
    onStart: PropTypes.func.isRequired
};

export default ControlPanel;
