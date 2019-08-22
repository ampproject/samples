import * as React from 'react';
import styled, {keyframes, css} from 'styled-components';

import AmpImage from '/component/amp/AmpImage';
import AmpStoryPage from '/component/amp/AmpStoryPage';

import {
  AbsoluteContainer,
  HeadingSerif,
  Underline,
  Text as SharedText,
} from './shared';

const ANIMATION_DURATION = 5;

const POLAROID_Z_INDEX = {
  TOP: 6000,
  TOP_SHADOW: 5000,
  BOTTOM: 4000,
  BOTTOM_SHADOW: 3000,
};

const swipe = keyframes`
  0%, 80%, 100% {
    opacity: 0;
    transform: translateX(120%);
  }
  20% {
    opacity: 1;
    transform: translateX(50%);
    z-index: ${POLAROID_Z_INDEX.BOTTOM};
  }
  40% {
    opacity: 1;
    transform: translateX(0%) rotate(-28deg);
    z-index: ${POLAROID_Z_INDEX.TOP};
  }
  50% {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

const shadowSwipe = keyframes`
  0%, 80%, 100% {
    opacity: 0;
    transform: translateX(120%) translateY(8%);
    z-index: ${POLAROID_Z_INDEX.TOP_SHADOW};
  }
  20% {
    opacity: 1;
    transform: translateX(50%) translateY(5%);
    z-index: ${POLAROID_Z_INDEX.BOTTOM_SHADOW};
  }
  40% {
    opacity: 1;
    transform: translateX(0%) translateY(8%) rotate(-28deg);
    z-index: ${POLAROID_Z_INDEX.TOP_SHADOW};
  }
  50% {
    opacity: 0;
    transform: translateX(-90%) translateY(8%);
    z-index: ${POLAROID_Z_INDEX.TOP_SHADOW};
  }
`;

const Heading = styled(HeadingSerif)`
  color: #124041;
  text-align: center;
`;

const Content = styled.div`
  width: 100%;
  height: 185px;
  position: relative;
  margin: 40px 0;

  @media (min-height: 700px) {
    height: 275px;
  }
`;

const Text = styled(SharedText)`
  color: #124041;
  text-align: center;
`;

const POLAROID_IMGS = [
  '/static/stories/millennials/pola_landscape_1.png',
  '/static/stories/millennials/pola_landscape_2.png',
  '/static/stories/millennials/pola_sushi.png',
  '/static/stories/millennials/pola_woman.png',
  '/static/stories/millennials/pola_woman_2.png',
];

const AnimatedImage = styled(
  // eslint-disable-next-line no-unused-vars
  ({index, carouselLength, animationName, ...props}) => <AmpImage {...props} />,
)`
  transform: translateX(120%);

  & img {
    object-fit: contain;
  }

  [active] & {
    animation: ${({animationName, index, carouselLength}) =>
      css`${animationName} ${ANIMATION_DURATION}s ease ${(ANIMATION_DURATION *
        index) /
        carouselLength}s infinite`};
  }
`;

const StoryPage3 = () => {
  return (
    <AmpStoryPage id="StoryPage3" backgroundColor="teal">
      <amp-story-grid-layer
        template="vertical"
        style={{alignContent: 'center'}}
      >
        <Heading>Storytelling</Heading>
        <Content>
          <AbsoluteContainer>
            {POLAROID_IMGS.map((imgSrc, i, arr) => (
              <React.Fragment key={imgSrc}>
                <AnimatedImage
                  layout="fill"
                  src={imgSrc}
                  index={i}
                  carouselLength={arr.length}
                  animationName={swipe}
                />
                <AnimatedImage
                  layout="fill"
                  src="/static/stories/millennials/pola_shadow.png"
                  index={i}
                  carouselLength={arr.length}
                  animationName={shadowSwipe}
                />
              </React.Fragment>
            ))}
          </AbsoluteContainer>
        </Content>
        <Text>
          Millennials are choosing to use photography as a more engaging way to
          tell <Underline>their story</Underline>
        </Text>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage3;
