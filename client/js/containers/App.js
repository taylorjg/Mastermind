import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { GameState } from '../constants';
import ControlPanel from '../components/ControlPanel';
import SecretCode from '../components/SecretCode';
import GuessRow from '../components/GuessRow';
import { MAX_GUESSES } from '../constants';

class App extends Component {
    render() {
        const props = this.props;
        const reveal = props.gameState !== GameState.IN_PROGRESS;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12 col-md-offset-4 col-md-1">
                        <ControlPanel gameState={props.gameState} onStart={props.onStart}></ControlPanel>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-offset-4 col-xs-8 col-md-offset-6 col-md-3">
                        <SecretCode code={props.secret} reveal={reveal}></SecretCode>
                    </div>
                </div>
                {
                    props.guesses.slice().reverse().map((guess, reverseIndex) => {
                        const index = MAX_GUESSES - 1 - reverseIndex;
                        return <GuessRow
                            key={index}
                            index={index}
                            active={index === props.activeGuessIndex}
                            autoSolveMode={props.autoSolveMode}
                            guess={guess}
                            onSetPeg={props.onSetPeg}
                            onGuess={props.autoSolveMode ? props.onAutoGuess : props.onGuess}
                        >
                        </GuessRow>;
                    })
                }
            </div>
        );
    }
}

App.propTypes = {
    gameState: PropTypes.symbol.isRequired,
    autoSolveMode: PropTypes.bool.isRequired,
    secret: PropTypes.arrayOf(PropTypes.symbol).isRequired,
    guesses: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
        feedbackPegs: PropTypes.arrayOf(PropTypes.symbol).isRequired
    })).isRequired,
    activeGuessIndex: PropTypes.number.isRequired,
    onStart: PropTypes.func.isRequired,
    onSetPeg: PropTypes.func.isRequired,
    onGuess: PropTypes.func.isRequired,
    onAutoGuess: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    onStart: () => dispatch(actions.start()),
    onSetPeg: (index, peg) => dispatch(actions.setPeg(index, peg)),
    onGuess: () => dispatch(actions.guess()),
    onAutoGuess: () => dispatch(actions.autoGuessAsync())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
