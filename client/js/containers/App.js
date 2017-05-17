import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
                        <ControlPanel></ControlPanel>
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
                        <GuessRow key={index} guess={guess}></GuessRow>)
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
        code: PropTypes.arrayOf(PropTypes.symbol).isRequired,
        feedback: PropTypes.shape({
            blacks: PropTypes.number.isRequired,
            whites: PropTypes.number.isRequired
        }).isRequired
    })).isRequired
};

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    onExample: () => dispatch({ type: 'example' })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
