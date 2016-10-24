import AMPDocument from './components/amp-document/amp-document';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Shell from './components/shell';

import 'bootstrap/dist/css/bootstrap.css';
import './bootstrap-theme.css'; // Replace with your own bootstrap theme!

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={Shell}>
      <Route path='content/:document' component={
        props => <AMPDocument src={'/content/' + props.params.document} />
      } />
    </Route>
  </Router>
), document.getElementById('root'));
