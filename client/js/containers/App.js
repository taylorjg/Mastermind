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
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <span className="pull-right">version: <i>{props.version}</i></span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <hr />
                    </div>
                </div>
                <div id="board">
                    <div className="row boardRow">
                        <div className="col-xs-12">
                            <ControlPanel gameState={props.gameState} onStart={props.onStart}></ControlPanel>
                        </div>
                    </div>
                    <div className="row boardRow">
                        <div className="col-xs-3"></div>
                        <SecretCode code={props.secret} reveal={reveal}></SecretCode>
                    </div>
                    <div className="row boardRow">
                        <div className="col-xs-3"></div>
                        <div className="col-xs-3 divider">
                        </div>
                    </div>
                    {
                        props.guesses.slice().reverse().map((guess, index) =>
                            <GuessRow
                                key={MAX_GUESSES - index - 1}
                                index={MAX_GUESSES - index - 1}
                                active={MAX_GUESSES - index - 1 === props.activeGuessIndex}
                                guess={guess}
                                onSetPeg={props.onSetPeg}
                                onGuess={props.onGuess}
                            >
                            </GuessRow>)
                    }

                </div>
            </div>
        );
    }
}

App.propTypes = {
    version: PropTypes.string.isRequired,
    gameState: PropTypes.symbol.isRequired,
    secret: PropTypes.arrayOf(PropTypes.symbol).isRequired,
    guesses: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
        feedbackPegs: PropTypes.arrayOf(PropTypes.symbol).isRequired
    })).isRequired,
    activeGuessIndex: PropTypes.number.isRequired,
    onStart: PropTypes.func.isRequired,
    onSetPeg: PropTypes.func.isRequired,
    onGuess: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    onStart: () => dispatch(actions.start()),
    onSetPeg: (index, peg) => dispatch(actions.setPeg(index, peg)),
    onGuess: code => dispatch(actions.guess(code))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
