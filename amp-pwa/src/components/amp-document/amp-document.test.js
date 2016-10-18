import React from 'react';
import ReactDOM from 'react-dom';
import AMPDocument from './amp-document';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AMPDocument src='http://foo.bar' />, div);
});
