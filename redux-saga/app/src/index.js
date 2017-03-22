import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import reducer from './reducers'
import saga from './sagas'
import App from './containers/App'
import HomeContainer from './containers/HomeContainer'
import About from './components/About'

// create middleware stack
const middleware = createSagaMiddleware()

// create redux store with root reducer and middleware stack
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(middleware)),
)

// initialise the saga
middleware.run(saga)

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
