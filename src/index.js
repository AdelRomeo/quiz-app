import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,} from 'react-router-dom'
import classes from './index.module.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const app = <Router><App/></Router>

ReactDOM.render(
  <>
    {app}
  </>,
  document.getElementById('root')
);

reportWebVitals();
