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

class MediaComponentsStoryView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head />
        <AmpStory
          standalone=""
          title="Media Components"
          publisher="AMP tutorials"
          publisher-logo-src="/static/stories/publisher_logo.png"
          poster-square-src="/static/stories/story3/thumbnail.png"
          poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"
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
          <amp-story-bookend
            src="/static/stories/story3/bookend.json"
            layout="nodisplay"
          />
        </AmpStory>
      </React.Fragment>
    );
  }
}

export default MediaComponentsStoryView;
