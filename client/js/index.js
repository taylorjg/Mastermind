import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/reducers';
import App from './containers/App';
import './spinner';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const root = document.getElementById('root');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    root);
