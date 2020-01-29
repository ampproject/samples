import * as React from 'react';

import AmpStoryPage from '/component/amp/AmpStoryPage';
import AmpStoryIntro from '/component/base/AmpStoryIntro';

const StoryPage1 = () => {
  const backgroundSrcs = [
    {
      src: '/static/stories/story1/intro.m3u8',
      type: 'application/x-mpegurl',
    },
    {
      src: '/static/stories/story1/intro.mp4',
      type: 'video/mp4',
    },
  ];
  return (
    <AmpStoryPage id="cover" backgroundColor="storiesPink">
      <AmpStoryIntro
        backgroundSrcs={backgroundSrcs}
        posterSrc="/static/stories/story1/introPoster@1x.png"
        color="storiesRed"
        title="What's the story with AMP Stories"
      />
    </AmpStoryPage>
  );
};

export default StoryPage1;
