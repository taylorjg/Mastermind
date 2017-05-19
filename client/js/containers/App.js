import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { GameState } from '../constants';
import ControlPanel from '../components/ControlPanel';
import SecretCode from '../components/SecretCode';
import GuessRow from '../components/GuessRow';

class App extends Component {
    render() {
        const props = this.props;
        const reveal = props.gameState === GameState.WON || props.gameState === GameState.LOST;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <span className="pull-right">version: <i>{props.version}</i></span>
                    </div>
                    <div className="col-md-12">
                        <hr />
                    </div>
                </div>
                <div id="board">
                    <div className="row">
                        <div className="col-md-offset-2 col-md-1">
                            <ControlPanel gameState={props.gameState} onStart={props.onStart}></ControlPanel>
                        </div>
                        <div className="col-md-10">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-offset-5 col-md-3">
                            <SecretCode code={props.secret} reveal={reveal}></SecretCode>
                        </div>
                    </div>
                    {
                        props.guesses.map((guess, index) =>
                            <GuessRow
                                key={index}
                                index={index}
                                guess={guess}
                                onSetPeg={props.onSetPeg}
                                onGuess={props.onGuess}
                                onClear={props.onClear}
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
        active: PropTypes.bool.isRequired,
        code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
        feedbackPegs: PropTypes.arrayOf(PropTypes.symbol).isRequired
    })).isRequired,
    onStart: PropTypes.func.isRequired,
    onSetPeg: PropTypes.func.isRequired,
    onGuess: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    onStart: () => dispatch(actions.start()),
    onSetPeg: (index, peg) => dispatch(actions.setPeg(index, peg)),
    onGuess: code => dispatch(actions.guess(code)),
    onClear: () => dispatch(actions.clear())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
