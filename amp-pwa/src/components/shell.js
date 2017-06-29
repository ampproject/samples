/** @license
 * Copyright 2015 - present The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { Grid, Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import Home from './home';
import './shell.css';

/**
 * The (App) Shell contains the web app's entire UI.
 *
 * The navigation bar is always displayed, with either a `Home` or `Article` component beneath it.
 */
export default class Shell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {'documents': []};
  }

  componentDidMount() {
    fetch('/documents').then(response => {
      if (response.status !== 200) {
        console.log('AMP document list fetch failed with code: ' + response.status);
        return;
      }
      response.json().then(data => {
        this.setState({'documents': data});
      });
    });
  }

  render() {
    return (
      <div>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>The Scenic</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Navbar>

        <Grid className='contents'>
          { this.props.children || <Home documents={this.state.documents} /> }
        </Grid>
      </div>
    );
  }
}
