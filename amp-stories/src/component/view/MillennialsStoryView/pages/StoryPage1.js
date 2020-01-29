import * as React from 'react';
import {rem} from 'polished';
import styled, {keyframes, css} from 'styled-components';

import AmpImage from '/component/amp/AmpImage';
import AmpStoryPage from '/component/amp/AmpStoryPage';

import {HeadingSerif as Heading, Text as SharedText} from './shared';

const ANIMATION_DURATION = 7000;

const CAROUSEL_IMGS = [
  '/static/stories/millennials/intro_1.jpg',
  '/static/stories/millennials/intro_2.jpg',
  '/static/stories/millennials/intro_3.jpg',
  '/static/stories/millennials/intro_4.jpg',
  '/static/stories/millennials/intro_5.jpg',
  '/static/stories/millennials/intro_6.jpg',
];

const pulse = keyframes`
  0%, 40%, 60%, 80%, 100% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
`;

// eslint-disable-next-line no-unused-vars
const CarouselImage = styled(({key, index, carouselLength, ...props}) => (
  <AmpImage {...props} />
))`
  opacity: 0;
  & img {
    object-fit: cover;
  }

  [active] & {
    animation: ${({index, carouselLength}) =>
      css`${pulse} ${ANIMATION_DURATION}ms ease ${(ANIMATION_DURATION * index) /
        carouselLength}ms infinite`};
  }
`;

const ImageCarousel = styled.div`
  background: ${({theme}) => theme.colors.black};
`;

const SubHeading = styled(SharedText)`
  font-size: ${rem(50)};
`;

const CtaButton = styled.p`
  color: #ff005b;
  font-size: ${rem(16)};
  text-align: left;
`;

const StoryPage1 = () => {
  return (
    <AmpStoryPage id="StoryPage1">
      <amp-story-grid-layer
        template="vertical"
        style={{gridTemplateRows: '1fr', padding: 0}}
      >
        <ImageCarousel>
          {CAROUSEL_IMGS.map((imgSrc, i) => (
            <CarouselImage
              layout="fill"
              src={imgSrc}
              key={imgSrc}
              index={i}
              carouselLength={CAROUSEL_IMGS.length}
            />
          ))}
        </ImageCarousel>
      </amp-story-grid-layer>
      <amp-story-grid-layer
        template="vertical"
        style={{alignContent: 'center'}}
      >
        <Heading>Millennials</Heading>
        <SubHeading>
          The rise of millions of photo- <br />
          graphers
        </SubHeading>
        <CtaButton>Tap to start</CtaButton>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage1;
