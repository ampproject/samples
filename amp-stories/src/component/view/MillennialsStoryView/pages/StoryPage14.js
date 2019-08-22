import * as React from 'react';
import {rem} from 'polished';
import styled from 'styled-components';

import AmpStoryPage from '/component/amp/AmpStoryPage';

import {HeadingSerif, Text as SharedText} from './shared';

const BACKGROUND_SRCS = [
  {
    src: '/static/stories/millennials/oscars.m3u8',
    type: 'application/x-mpegurl',
  },
  {
    src: '/static/stories/millennials/oscars.mp4',
    type: 'video/mp4',
  },
];

const TextContainer = styled((props) => <div {...props} />)`
  grid-row-start: 2;
  place-self: center;
`;

const Title = styled((props) => <HeadingSerif {...props} />)`
  margin: ${rem(8)} 0;
`;

const Number = styled(SharedText)`
  font-size: ${rem(70)};
  margin: ${rem(8)} 0;
`;

const Paragraph = styled(SharedText)`
  font-size: ${rem(24)};
`;

const StoryPage14 = () => {
  return (
    <AmpStoryPage id="StoryPage14" backgroundColor="storiesBlue">
      <amp-story-grid-layer template="fill">
        <amp-video
          layout="fill"
          loop=""
          autoplay=""
          noaudio=""
          poster="/static/stories/millennials/oscars_intro_img.png"
          width="720"
          height="1280"
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
          <Title>Selfies</Title>
          <Number>93M</Number>
          <Paragraph>
            Selfies have been taken every day since as far back as 2014, and
            that's only on Android devices!
          </Paragraph>
        </TextContainer>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage14;
