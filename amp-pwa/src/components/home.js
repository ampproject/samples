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
