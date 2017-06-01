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
                <div>
                    <div className="row boardRow">
                        <div className="col-xs-1">
                            <ControlPanel gameState={props.gameState} onStart={props.onStart}></ControlPanel>
                        </div>
                        <div className="col-xs-11">
                            <span className="pull-right">version: <i>{props.version}</i></span>
                        </div>
                    </div>
                    <div className="row boardRow">
                        <div className="col-xs-2"></div>
                        <SecretCode code={props.secret} reveal={reveal}></SecretCode>
                    </div>
                    <div className="row boardRow">
                        <div className="col-xs-2"></div>
                        <div className="col-xs-4 col-md-3 divider">
                        </div>
                    </div>
                    {
                        props.guesses.slice().reverse().map((guess, reverseIndex) => {
                            const index = MAX_GUESSES - 1 - reverseIndex;
                            return <GuessRow
                                key={index}
                                index={index}
                                active={index === props.activeGuessIndex}
                                guess={guess}
                                onSetPeg={props.onSetPeg}
                                onGuess={props.onGuess}
                            >
                            </GuessRow>;
                        })
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
    onGuess: code => dispatch(actions.guess(code)),
    onAutoGuess: () => dispatch(actions.autoGuess())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
