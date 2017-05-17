import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import ControlPanel from '../components/ControlPanel';
import SecretCode from '../components/SecretCode';
import GuessRow from '../components/GuessRow';

class App extends Component {
    render() {
        const props = this.props;
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
                <div className="row">
                    <div className="col-md-offset-1 col-md-1">
                        <ControlPanel onStart={props.onStart}></ControlPanel>
                    </div>
                    <div className="col-md-10">
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-offset-1 col-md-11">
                        <SecretCode code={props.secret}></SecretCode>
                    </div>
                </div>
                {
                    props.guesses.map((guess, index) =>
                        <GuessRow
                            key={index}
                            guess={guess}
                            onGuess={props.onGuess}
                            onClear={props.onClear}
                        >
                        </GuessRow>)
                }
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
        feedback: PropTypes.shape({
            blacks: PropTypes.number.isRequired,
            whites: PropTypes.number.isRequired
        }).isRequired
    })).isRequired,
    onStart: PropTypes.func.isRequired,
    onGuess: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    onStart: () => dispatch(actions.start()),
    onGuess: code => dispatch(actions.guess(code)),
    onClear: () => dispatch(actions.clear())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
