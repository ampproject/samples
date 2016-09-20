import { Grid, Nav, Navbar, NavItem } from 'react-bootstrap';
import React from 'react';
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
              <a href='/'>The Accelerated Mobile Post</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href='http://github.com/choumx/amp-pwa'>View on GitHub</NavItem>
              <NavItem eventKey={2} href='http://ampproject.org'>AMP Project</NavItem>
              <NavItem eventKey={3} href='https://facebook.github.io/react/'>React</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Grid className='contents'>
          { this.props.children || <Home documents={this.state.documents} /> }
        </Grid>
      </div>
    );
  }
}
