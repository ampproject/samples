import * as React from 'react';

import Head from './Head';
import AmpStoryIntro from '/component/base/AmpStoryIntro';
import AmpStory from '/component/amp/AmpStory';
import AmpStoryPage from '/component/amp/AmpStoryPage';
import StoryPage2 from './pages/StoryPage2';
import StoryPage3 from './pages/StoryPage3';
import StoryPage4 from './pages/StoryPage4';
import StoryPage5 from './pages/StoryPage5';

class AnimationsStoryView extends React.Component {
  render() {
    const backgroundSrcs = [
      {
        src: '/static/stories/story2/intro.m3u8',
        type: 'application/x-mpegurl',
      },
      {
        src: '/static/stories/story2/intro.mp4',
        type: 'video/mp4',
      },
    ];
    return (
      <AmpStory
        title="Animations"
        publisher="AMP tutorials"
        standalone=""
        publisher-logo-src="/static/stories/publisher_logo.png"
        poster-square-src="/static/stories/story2/thumbnail.png"
        poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"
      >
        <Head />
        <AmpStoryPage id="cover" backgroundColor="storiesBkOrange">
          <AmpStoryIntro
            backgroundSrcs={backgroundSrcs}
            posterSrc="/static/stories/story2/introPoster@1x.png"
            color="storiesOrange"
            title="Create animations & transitions"
          />
        </AmpStoryPage>

        <StoryPage2 />
        <StoryPage3 />
        <StoryPage4 />
        <StoryPage5 />
        <amp-story-bookend
          src="/static/stories/story2/bookend.json"
          layout="nodisplay"
        />
      </AmpStory>
    );
  }
}

export default AnimationsStoryView;
