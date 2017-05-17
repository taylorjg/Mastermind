import React from 'react';
import PropTypes from 'prop-types';

const ControlPanel = ({ onStart }) => {
    return (
        <button className="btn btn-sm btn-primary" onClick={onStart}>Start</button>
    );
};

ControlPanel.propTypes = {
    onStart: PropTypes.func.isRequired
};

export default ControlPanel;
