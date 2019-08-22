import * as React from 'react';

import AmpStory from '/component/amp/AmpStory';

import Head from './Head';
import StoryPage1 from './pages/StoryPage1';
import StoryPage2 from './pages/StoryPage2';
import StoryPage3 from './pages/StoryPage3';
import StoryPage4 from './pages/StoryPage4';

class WrapUpStoryView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head />
        <AmpStory
          standalone=""
          title="Wrap Up"
          publisher="AMP tutorials"
          publisher-logo-src="/static/stories/publisher_logo.png"
          poster-square-src="/static/stories/story6/thumbnail.png"
          poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"
        >
          <StoryPage1 />
          <StoryPage2 />
          <StoryPage3 />
          <StoryPage4 />
          <amp-story-bookend
            src="/static/stories/story6/bookend.json"
            layout="nodisplay"
          />
        </AmpStory>
      </React.Fragment>
    );
  }
}

export default WrapUpStoryView;
