import { Button, Jumbotron, PageHeader } from 'react-bootstrap';
import React from 'react';
import Article from './article';
import './home.css';

/**
 * The app's home page, modulo the navigation bar.
 *
 * Displays a jumbotron with the app's description and a list of `Article`s.
 */
export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>React + AMP + PWA</h1>
          <p>A simple React-based progressive web app that displays Accelerated Mobile Page (AMP) content.</p>
          <p><Button href='http://github.com/choumx/amp-pwa' target='_blank' bsStyle='primary'>View on GitHub</Button></p>
        </Jumbotron>

        <PageHeader>Articles</PageHeader>

        <div className='articles'>
          {this.props.documents.map(doc =>
            <Article title={doc.title} subtitle={doc.subtitle} src={doc.url} key={doc.url} />
          )}
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  documents: React.PropTypes.arrayOf(React.PropTypes.object),
}
