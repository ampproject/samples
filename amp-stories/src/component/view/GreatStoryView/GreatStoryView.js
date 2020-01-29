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

class GreatStoryView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head />
        <AmpStory
          standalone=""
          title="What makes a great AMP Story"
          publisher="AMP tutorials"
          publisher-logo-src="/static/stories/publisher_logo.png"
          poster-square-src="/static/stories/story1/thumbnail.png"
          poster-portrait-src="http://placehold.it/256x128"
        >
          <StoryPage1 />
          <StoryPage2 />
          <StoryPage3 />
          <StoryPage4 />
          <StoryPage5 />
          <StoryPage6 />
          <StoryPage7 />
          <amp-story-bookend
            layout="nodisplay"
            src="/static/stories/story1/bookend.json"
          />
        </AmpStory>
      </React.Fragment>
    );
  }
}

export default GreatStoryView;
