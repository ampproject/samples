import * as React from 'react';
import {rem} from 'polished';
import styled, {keyframes, css} from 'styled-components';

import AmpImage from '/component/amp/AmpImage';
import AmpStoryPage from '/component/amp/AmpStoryPage';
import Confetti from '/component/base/Confetti';

import {Text as SharedText, AbsoluteContainer} from './shared';

const ANIMATION_DURATION = 4;

const droneKeyframes = keyframes`
  0% {
    transform: rotate(18deg) translateY(-175%) translateX(73%);
  }
  33%, 66% {
    transform: rotate(0deg) translateY(0%) translateX(0%);
  }
  100% {
    transform: rotate(-22deg) translateY(-140%) translateX(-90%);
  }
`;

const shadowKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateX(120%) translateY(21%) scale(0.4);
  }
  33%, 66% {
    opacity: 1;
    transform: translateX(0%) translateY(21%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(-120%) translateY(21%) scale(0.4);
  }
`;

const BottomContainer = styled((props) => <div {...props} />)`
  grid-row-start: 2;
  grid-row-end: 2;
  place-self: center;
  position: relative;
  height: 100%;
`;

const TopContainer = styled((props) => <div {...props} />)`
  grid-row-start: 1;
  grid-row-end: 1;
`;

const Text = styled(SharedText)`
  color: #092626;
  font-size: ${rem(24)};
`;

const AnimatedImage = styled(
  // eslint-disable-next-line no-unused-vars
  ({animationName, ...props}) => <AmpImage {...props} />,
)`
  & img {
    object-fit: contain;
  }

  [active] & {
    animation: ${({animationName}) =>
      css`
        ${animationName} ${ANIMATION_DURATION}s ease infinite
      `};
  }
`;

const StoryPage16 = () => {
  return (
    <AmpStoryPage id="StoryPage16" backgroundColor="violet">
      <amp-story-grid-layer
        template="vertical"
        style={{gridTemplateRows: '1fr 1fr'}}
      >
        <TopContainer>
          <Text>
            Because Millennials are fortunate enough to be playing with
            photography at a time where smartphones and drones are ubiquitous in
            society.
          </Text>
        </TopContainer>
        <BottomContainer>
          <Confetti preset="basic" color="white" />
          <div style={{position: 'absolute', top: 0, right: 0}}>
            <Confetti preset="small" color="white" />
          </div>
          <AbsoluteContainer>
            <AnimatedImage
              layout="fill"
              src="/static/stories/millennials/drone@2x.png"
              animationName={droneKeyframes}
            />
            <AnimatedImage
              layout="fill"
              src="/static/stories/millennials/shadow@2x.png"
              animationName={shadowKeyframes}
              style={{zIndex: '-1'}}
            />
          </AbsoluteContainer>
        </BottomContainer>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage16;
