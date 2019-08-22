import * as React from 'react';
import styled from 'styled-components';
import {rem} from 'polished';

import AmpStoryPage from '/component/amp/AmpStoryPage';

const VIDEO_SRCS = [
  {
    src: '/static/stories/story1/visibility.m3u8',
    type: 'application/x-mpegurl',
  },
  {
    src: '/static/stories/story1/visibility.mp4',
    type: 'video/mp4',
  },
];

const Heading = styled.h1`
  font-size: ${rem(64)};
  margin: 0;
  color: ${({theme}) => theme.colors.white};
`;

const TextContainer = styled.div`
  grid-row-start: middle-third;
  grid-row-end: lower-third;
  text-align: center;
  display: flex;
  justify-content: center;
  padding-bottom: 20%;
`;

const StoryPage6 = () => {
  return (
    <AmpStoryPage id="visible-text" backgroundColor="storiesPink">
      <amp-story-grid-layer template="fill">
        <amp-video
          layout="fill"
          loop=""
          autoplay=""
          noaudio=""
          poster="/static/stories/story1/visibilityPoster@1x.png"
          width="720"
          height="1280"
        >
          {VIDEO_SRCS.map(({src, type}) => (
            <source key={src} src={src} type={type} />
          ))}
        </amp-video>
      </amp-story-grid-layer>
      <amp-story-grid-layer
        template="vertical"
        style={{
          gridTemplateRows: '1fr',
          alignContent: 'end',
        }}
      >
        <TextContainer>
          <Heading>Ensure your text is always visible</Heading>
        </TextContainer>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage6;
