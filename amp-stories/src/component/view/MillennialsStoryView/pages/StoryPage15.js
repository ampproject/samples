import * as React from 'react';

import AmpStoryPage from '/component/amp/AmpStoryPage';

const BACKGROUND_SRCS = [
  {
    src: '/static/stories/millennials/technology.m3u8',
    type: 'application/x-mpegurl',
  },
  {
    src: '/static/stories/millennials/technology.mp4',
    type: 'video/mp4',
  },
];

const StoryPage15 = () => {
  return (
    <AmpStoryPage id="StoryPage15" backgroundColor="violet">
      <amp-story-grid-layer template="fill">
        <amp-video
          layout="fill"
          loop=""
          autoplay=""
          noaudio=""
          poster="/static/stories/millennials/technology_intro_img.png"
          width="720"
          height="1280"
        >
          {BACKGROUND_SRCS.map(({src, type}) => (
            <source key={src} src={src} type={type} />
          ))}
        </amp-video>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage15;
