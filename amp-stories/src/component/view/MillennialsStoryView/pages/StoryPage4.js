import * as React from 'react';
import {rem} from 'polished';
import styled from 'styled-components';

import AmpStoryPage from '/component/amp/AmpStoryPage';

import {Text as SharedText, Underline} from './shared';

const BACKGROUND_SRCS = [
  {
    src: '/static/stories/millennials/landscape.m3u8',
    type: 'application/x-mpegurl',
  },
  {
    src: '/static/stories/millennials/landscape.mp4',
    type: 'video/mp4',
  },
];

const Text = styled(SharedText)`
  font-size: ${rem(44)};
  line-height: 1.125;
`;

const StoryPage4 = () => {
  return (
    <AmpStoryPage id="StoryPage4" backgroundColor="storiesBlue">
      <amp-story-grid-layer template="fill">
        <amp-video
          layout="fill"
          loop=""
          autoplay=""
          noaudio=""
          poster="/static/stories/millennials/landscape_intro_img.png"
          width="720"
          height="1280"
        >
          {BACKGROUND_SRCS.map(({src, type}) => (
            <source key={src} src={src} type={type} />
          ))}
        </amp-video>
      </amp-story-grid-layer>
      <amp-story-grid-layer
        template="fill"
        style={{backgroundColor: 'black', opacity: 0.5}}
      />
      <amp-story-grid-layer template="vertical" style={{alignContent: 'end'}}>
        <Text>
          Whether
          <br />
          that be to
          <br />
          share <Underline>the</Underline>
          <br />
          <Underline>discovery</Underline>
          <br />
          of an
          <br />
          amazing
          <br />
          <Underline>new place.</Underline>
        </Text>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage4;
