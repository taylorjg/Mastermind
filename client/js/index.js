import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/reducers';
import App from './containers/App';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const root = document.getElementById('root');
const version = root.getAttribute('version');

render(
    <Provider store={store}>
        <App version={version} />
    </Provider>,
    root);

const FRAMES = 12;
const FRAME_WIDTH = 15;
const FRAME_INTERVAL = 66;
let counter = 0;
setInterval(function () {
    const offset = counter * -FRAME_WIDTH;
    const position = `${offset}px 0px`;
    const spinners = Array.from(document.getElementsByClassName('spinner'));
    spinners.forEach(spinner => spinner.style.backgroundPosition = position);
    counter = (counter + 1) % FRAMES;
}, FRAME_INTERVAL);
