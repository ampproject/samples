import * as React from 'react';

import AmpStoryPage from '/component/amp/AmpStoryPage';
import AmpStoryIntro from '/component/base/AmpStoryIntro';

const backgroundSrcs = [
  {
    src: '/static/stories/story5/intro.m3u8',
    type: 'application/x-mpegurl',
  },
  {
    src: '/static/stories/story5/intro.mp4',
    type: 'video/mp4',
  },
];

const StoryPage1 = () => {
  return (
    <AmpStoryPage id="cover" backgroundColor="storiesBkLolliPink">
      <AmpStoryIntro
        backgroundSrcs={backgroundSrcs}
        posterSrc="/static/stories/story5/introPoster@1x.png"
        color="storiesLolliPink"
        title="Integrate links, CTA and Ads"
      />
    </AmpStoryPage>
  );
};

export default StoryPage1;
