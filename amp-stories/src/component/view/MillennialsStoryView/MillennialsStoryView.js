import * as React from 'react';
import AmpStory from '/component/amp/AmpStory';

import Head from './Head';
import StoryPage1 from './pages/StoryPage1';
import StoryPage2 from './pages/StoryPage2';
import StoryPage3 from './pages/StoryPage3';
import StoryPage4 from './pages/StoryPage4';
import StoryPage5 from './pages/StoryPage5';
import StoryPage6 from './pages/StoryPage6';
import StoryPage7 from './pages/StoryPage7';
import StoryPage8 from './pages/StoryPage8';
import StoryPage9 from './pages/StoryPage9';
import StoryPage10 from './pages/StoryPage10';
import StoryPage11 from './pages/StoryPage11';
import StoryPage12 from './pages/StoryPage12';
import StoryPage13 from './pages/StoryPage13';
import StoryPage14 from './pages/StoryPage14';
import StoryPage15 from './pages/StoryPage15';
import StoryPage16 from './pages/StoryPage16';
import StoryPage17 from './pages/StoryPage17';

class MillennialsStoryView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head />
        <AmpStory
          standalone=""
          title="Millennials"
          publisher="AMP tutorials"
          publisher-logo-src="/static/stories/publisher_logo.png"
          poster-portrait-src="https://placehold.it/256x128"
          poster-landscape-src="https://placehold.it/128x256"
          poster-square-src="https://placehold.it/128x128"
        >
          <StoryPage1 />
          <StoryPage2 />
          <StoryPage3 />
          <StoryPage4 />
          <StoryPage5 />
          <StoryPage6 />
          <StoryPage7 />
          <StoryPage8 />
          <StoryPage9 />
          <StoryPage10 />
          <StoryPage11 />
          <StoryPage12 />
          <StoryPage13 />
          <StoryPage14 />
          <StoryPage15 />
          <StoryPage16 />
          <StoryPage17 />
          <amp-story-bookend
            layout="nodisplay"
            src="/static/stories/millennials/bookend.json"
          />
        </AmpStory>
      </React.Fragment>
    );
  }
}

export default MillennialsStoryView;
