import * as React from 'react';
import {rem} from 'polished';
import styled from 'styled-components';

import AmpStoryPage from '/component/amp/AmpStoryPage';

import {HeadingSerif, Text as SharedText} from './shared';

const BACKGROUND_SRCS = [
  {
    src: '/static/stories/millennials/scrolling_vector.m3u8',
    type: 'application/x-mpegurl',
  },
  {
    src: '/static/stories/millennials/scrolling_vector.mp4',
    type: 'video/mp4',
  },
];

const TextContainer = styled((props) => <div {...props} />)`
  grid-row-start: 2;
  grid-row-end: 2;
  place-self: end;
`;

const Title = styled((props) => <HeadingSerif {...props} />)`
  font-weight: 900;
  color: ${({theme}) => theme.colors.orange};
  font-size: ${rem(32)};
  margin: ${rem(10)} 0;
`;

const SanSerifText = styled(SharedText)`
  margin: ${rem(10)} 0;
`;

const Percent = styled(SanSerifText)`
  color: ${({theme}) => theme.colors.orange};
  font-size: ${rem(48)};
`;

const Text = styled(SanSerifText)`
  color: #092626;
  font-size: ${rem(20)};
`;

const StoryPage12 = () => {
  return (
    <AmpStoryPage id="StoryPage12" backgroundColor="yellow">
      <amp-story-grid-layer template="fill">
        <amp-video
          layout="fill"
          loop=""
          autoplay=""
          poster="/static/stories/millennials/scrolling_vector_intro_img.png"
          width="720"
          height="1280"
          noaudio=""
        >
          {BACKGROUND_SRCS.map(({src, type}) => (
            <source key={src} src={src} type={type} />
          ))}
        </amp-video>
      </amp-story-grid-layer>
      <amp-story-grid-layer
        template="vertical"
        style={{gridTemplateRows: '1fr 1fr'}}
      >
        <TextContainer>
          <Title>Emotions</Title>
          <Percent>81%</Percent>
          <Text>
            of Millennials share photos and videos they’ve captured. Clearly it
            isn’t all about capturing memories.
          </Text>
        </TextContainer>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage12;
