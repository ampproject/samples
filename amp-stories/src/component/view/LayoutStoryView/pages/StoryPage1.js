import * as React from 'react';

import AmpStoryIntro from '/component/base/AmpStoryIntro';

const StoryPage1 = () => {
  const backgroundSrcs = [
    {
      src: '/static/stories/story4/intro.m3u8',
      type: 'application/x-mpegurl',
    },
    {
      src: '/static/stories/story4/intro.mp4',
      type: 'video/mp4',
    },
  ];
  return (
    <amp-story-page id="cover">
      <AmpStoryIntro
        backgroundSrcs={backgroundSrcs}
        posterSrc="/static/stories/story4/introPoster@1x.png"
        color="storiesBlue"
        title="Set up your story with layouts"
      />
    </amp-story-page>
  );
};

export default StoryPage1;
