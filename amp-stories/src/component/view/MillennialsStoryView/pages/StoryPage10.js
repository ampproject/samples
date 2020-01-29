import * as React from 'react';
import {rem} from 'polished';
import styled, {keyframes, css} from 'styled-components';

import AmpStoryPage from '/component/amp/AmpStoryPage';

import Confetti from '/component/base/Confetti';

import {FancyHeading, Text as SharedText} from './shared';

const ANIMATION_DURATION = 10;

const BKGD_GRADIENTS = [
  'linear-gradient(140deg, #fc7d7b, #8e78ff)',
  'linear-gradient(140deg, #ebc08d, #f24645)',
  'linear-gradient(140deg, #fca5f1, #b5ffff)',
  'linear-gradient(140deg, #d585ff, #00ffee)',
];

const fade = keyframes`
  0%, 100% {
    opacity: 1;
  }
  33%, 66% {
    opacity: 0;
  }
`;

const Container = styled((props) => <div {...props} />)`
  grid-row-start: 1;
  grid-row-end: 1;
  place-self: center;
`;

const Title = styled((props) => <FancyHeading {...props} />)`
  margin-left: -100%;
  margin-right: -100%;
  text-align: center;
`;

const Text = styled(SharedText)`
  grid-row-start: lower-third;
  place-self: center;
  font-size: ${rem(24)};
`;

const ConfettiContainer = styled.div`
  grid-row-start: 2;
  grid-row-end: 3;
  place-self: center;
`;

const BackgroundGradient = styled.div`
  background: ${({background}) => background};
  [active] & {
    animation: ${({index, carouselLength}) =>
      css`${fade} ${ANIMATION_DURATION}s ease ${(ANIMATION_DURATION * index) /
        carouselLength}s infinite`};
  }
`;

const StoryPage10 = () => {
  return (
    <AmpStoryPage id="StoryPage10" backgroundColor="pink">
      <amp-story-grid-layer template="fill">
        {BKGD_GRADIENTS.map((bkgd, i, arr) => (
          <BackgroundGradient
            background={bkgd}
            key={i}
            index={i}
            carouselLength={arr.length}
          />
        ))}
      </amp-story-grid-layer>
      <amp-story-grid-layer
        template="vertical"
        style={{gridTemplateRows: '1fr 1fr'}}
      >
        <Container animate-in="fade-in">
          <Title animate-in="fly-in-right">Creativity</Title>
        </Container>
      </amp-story-grid-layer>
      <amp-story-grid-layer template="thirds">
        <ConfettiContainer>
          <Confetti preset="basic" color="white" />
        </ConfettiContainer>
      </amp-story-grid-layer>
      <amp-story-grid-layer template="thirds">
        <Text>
          The benefits extend past photography with millennials encouraged to
          develop and refine their personal aesthetic.
        </Text>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage10;
