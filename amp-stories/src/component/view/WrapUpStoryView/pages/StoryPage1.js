import React from 'react';
import styled from 'styled-components';
import {rem} from 'polished';

import AmpStoryPage from '/component/amp/AmpStoryPage';
import {BehindTheStoryPill as SharedPill} from '/component/base/AmpStoryIntro';

const BehindTheStoryPill = styled(SharedPill)`
  margin-bottom: 16px;
`;

const Text = styled.div`
  font-size: ${rem(48)};
  font-weight: 700;
  line-height: 1.1;
  color: ${({theme}) => theme.colors.storiesGreen};
`;

const backgroundSrcs = [
  {
    src: '/static/stories/story6/intro.m3u8',
    type: 'application/x-mpegurl',
  },
  {
    src: '/static/stories/story6/intro.mp4',
    type: 'video/mp4',
  },
];

const posterSrc = '/static/stories/story6/intro.png';

const StoryPage1 = () => (
  <AmpStoryPage id="cover" backgroundColor="storiesBkGreen">
    <amp-story-grid-layer template="fill">
      <amp-video
        layout="fill"
        loop=""
        autoplay=""
        poster={posterSrc}
        width="720"
        height="1280"
        noaudio=""
      >
        {backgroundSrcs.map(({src, type}) => (
          <source key={src} src={src} type={type} />
        ))}
      </amp-video>
    </amp-story-grid-layer>
    <amp-story-grid-layer template="vertical" style={{alignContent: 'end'}}>
      <div>
        <BehindTheStoryPill color="storiesGreen" />
        <Text>We look forward to seeing your AMP Stories</Text>
      </div>
    </amp-story-grid-layer>
  </AmpStoryPage>
);

export default StoryPage1;
