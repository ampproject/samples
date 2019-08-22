import * as React from 'react';
import {rem} from 'polished';
import styled from 'styled-components';

import AmpStoryPage from '/component/amp/AmpStoryPage';

import {Text} from './shared';

const BACKGROUND_SRCS = [
  {
    src: '/static/stories/millennials/scrolling_feed.m3u8',
    type: 'application/x-mpegurl',
  },
  {
    src: '/static/stories/millennials/scrolling_feed.mp4',
    type: 'video/mp4',
  },
];

const Quote = styled.blockquote`
  color: ${({theme}) => theme.colors.white};
  font-family: 'IBM Plex Serif';
  font-weight: 400;
  font-size: ${rem(28)};
  line-height: 1.3;
`;

const QuoteAttr = styled(Text)`
  font-size: ${rem(16)};
`;

const StoryPage2 = () => {
  return (
    <AmpStoryPage id="StoryPage2" backgroundColor="storiesBlue">
      <amp-story-grid-layer template="fill">
        <amp-video
          layout="fill"
          loop=""
          autoplay=""
          noaudio=""
          poster="/static/stories/millennials/scrolling_feed_intro_img.png"
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
        style={{backgroundColor: 'black', opacity: 0.4}}
      />
      <amp-story-grid-layer template="vertical" style={{alignContent: 'end'}}>
        <Quote>
          “There has never
          <br />
          been a higher
          <br />
          level of interest
          <br />
          in photos,
          <br />
          photography and
          <br />
          imaging”
        </Quote>
        <QuoteAttr>Ed Lee, InfoTrends researcher</QuoteAttr>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage2;
