import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,} from 'react-router-dom'
import classes from './index.module.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
//подключение redux
import {Provider} from 'react-redux'
//создание store
import {createStore, compose, applyMiddleware} from 'redux'
//подключение reducer'ov
import rootReducer from "./storeRedux/reducers/rootReducer";
import thunk from 'redux-thunk'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>
)

ReactDOM.render(
  <>
    {app}
  </>,
  document.getElementById('root')
);

reportWebVitals();
