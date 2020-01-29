import * as React from 'react';
import {rem} from 'polished';
import styled from 'styled-components';

import AmpStoryPage from '/component/amp/AmpStoryPage';

import {FancyHeading, Text as SharedText} from './shared';

const BACKGROUND_SRCS = [
  {
    src: '/static/stories/millennials/creativity_grid.m3u8',
    type: 'application/x-mpegurl',
  },
  {
    src: '/static/stories/millennials/creativity_grid.mp4',
    type: 'video/mp4',
  },
];

const Container = styled((props) => <div {...props} />)`
  grid-row-start: 1;
  grid-row-end: 1;
  place-self: center;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
`;

const Text = styled(SharedText)`
  grid-row-start: lower-third;
  place-self: center;
  font-size: ${rem(24)};
  text-align: center;
`;

const StoryPage11 = () => {
  return (
    <AmpStoryPage id="StoryPage11" backgroundColor="storiesBlue">
      <amp-story-grid-layer template="fill">
        <amp-video
          layout="fill"
          loop=""
          autoplay=""
          poster="/static/stories/millennials/creativity_grid_intro_img.png"
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
        <Container animate-in="fade-in">
          <FancyHeading animate-in="fly-in-right">Creativity</FancyHeading>
        </Container>
      </amp-story-grid-layer>
      <amp-story-grid-layer
        template="fill"
        style={{background: 'linear-gradient(to top, black, transparent)'}}
      />
      <amp-story-grid-layer template="thirds">
        <Text>
          Resulting in millions amazing and various sights on the world captured
          by millennials
        </Text>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage11;
