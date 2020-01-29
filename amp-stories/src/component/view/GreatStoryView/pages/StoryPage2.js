import * as React from 'react';
import styled, {keyframes} from 'styled-components';
import {rem} from 'polished';

import AmpImage from '/component/amp/AmpImage';
import AmpStoryPage from '/component/amp/AmpStoryPage';

import {Text as SharedText} from './shared';

const clockwise = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const counterClockwise = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

const ClockwiseShape = styled.div`
  z-index: -1;
  position: absolute;
  animation ${clockwise} 30s linear infinite;
`;

const CounterClockwiseShape = styled.div`
  z-index: -1;
  position: absolute;
  animation ${counterClockwise} 15s linear infinite;
`;

const Container = styled.div`
  align-self: center;
`;

const Heading = styled.h1`
  color: ${({theme}) => theme.colors.storiesRed};
  font-size: ${rem(42)};
  margin: 48px 24px 48px 0;
`;

const Text = styled(SharedText)`
  font-size: ${rem(21)};
`;

const Feature = styled((props) => {
  return (
    <div
      animate-in="fly-in-right"
      animate-in-timing-function="cubic-bezier(0.0, 0.0, 0.2, 1)"
      {...props}
    />
  );
})`
  margin: 14px 0px;
  display: block;
`;

const StoryPage2 = () => {
  return (
    <AmpStoryPage id="amp-features" backgroundColor="storiesPink">
      <amp-story-grid-layer template="fill">
        <div>
          <ClockwiseShape style={{top: '-136px', right: '-194px'}}>
            <AmpImage
              layout="fixed"
              src="/static/stories/story1/blob1.svg"
              width="389px"
              height="273px"
            />
          </ClockwiseShape>
          <CounterClockwiseShape style={{bottom: '-109px', right: '-166px'}}>
            <AmpImage
              layout="fixed"
              src="/static/stories/story1/blob2.svg"
              width="333px"
              height="218px"
            />
          </CounterClockwiseShape>
        </div>
      </amp-story-grid-layer>
      <amp-story-grid-layer
        template="vertical"
        style={{gridTemplateRows: '1fr'}}
      >
        <Container>
          <Heading>Learn what you can do with it</Heading>
          <Feature>
            <Text animate-in="fade-in">Animations & Transitions</Text>
          </Feature>
          <Feature animate-in-delay="0.1s">
            <Text animate-in="fade-in" animate-in-delay="0.1s">
              Layout / Grid
            </Text>
          </Feature>
          <Feature animate-in-delay="0.2s">
            <Text animate-in="fade-in" animate-in-delay="0.2s">
              Images & Videos
            </Text>
          </Feature>
          <Feature animate-in-delay="0.3s">
            <Text animate-in="fade-in" animate-in-delay="0.3s">
              Animations
            </Text>
          </Feature>
          <Feature animate-in-delay="0.4s">
            <Text animate-in="fade-in" animate-in-delay="0.4s">
              Links & CTA
            </Text>
          </Feature>
          <Feature animate-in-delay="0.5s">
            <Text animate-in="fade-in" animate-in-delay="0.5s">
              Ads
            </Text>
          </Feature>
        </Container>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage2;
