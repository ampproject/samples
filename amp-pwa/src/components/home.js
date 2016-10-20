import React from 'react';
import Article from './article';
import './home.css';

/**
 * The app's home page, modulo the navigation bar.
 * Displays a list of `Article`s.
 */
export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div className='categories'>
          <ul>
            <a href="#"><li><span className='active'>Recent</span></li></a>
            <a href="#"><li><span>Trending</span></li></a>
          </ul>
        </div>
        <div className='articles'>
          {this.props.documents.map(doc =>
            <Article
                title={doc.title}
                subtitle={'By ' + doc.author + ', ' + doc.date}
                image={doc.image}
                src={doc.url}
                key={doc.title} />
          )}
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  documents: React.PropTypes.arrayOf(React.PropTypes.object),
};
