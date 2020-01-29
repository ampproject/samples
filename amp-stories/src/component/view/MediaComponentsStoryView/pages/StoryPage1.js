import React from 'react';

import AmpStoryPage from '/component/amp/AmpStoryPage';
import AmpStoryIntro from '/component/base/AmpStoryIntro';

const backgroundSrcs = [
  {
    src: '/static/stories/story3/intro.m3u8',
    type: 'application/x-mpegurl',
  },
  {
    src: '/static/stories/story3/intro.mp4',
    type: 'video/mp4',
  },
];

const StoryPage1 = () => (
  <AmpStoryPage id="cover" backgroundColor="storiesBkLightBlue">
    <AmpStoryIntro
      backgroundSrcs={backgroundSrcs}
      posterSrc="/static/stories/story3/introPoster@1x.png"
      color="storiesLightBlue"
      title="Showcase photo, video and audio"
    />
  </AmpStoryPage>
);

export default StoryPage1;
