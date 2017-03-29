import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import reducer from './reducers';
import App from './containers/App';
import HomeContainer from './containers/HomeContainer';
import About from './components/About';

// create redux store with root reducer and middleware stack
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(promiseMiddleware())));

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={HomeContainer} />
                <Route path="/about" component={About} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root'),
);
