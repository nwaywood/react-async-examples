import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { createEpicMiddleware } from 'redux-observable'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import reducer from './reducers'
import epic from './epics'
import App from './containers/App'
import HomeContainer from './containers/HomeContainer'
import About from './components/About'

// create epic middleware
const middleware = createEpicMiddleware(epic)

// create redux store with root reducer and middleware stack
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(middleware)),
)

render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={HomeContainer} />
                <Route path="/about" component={About} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'))
