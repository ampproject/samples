import * as React from 'react';
import styled, {keyframes} from 'styled-components';
import {rem} from 'polished';

import AmpImage from '/component/amp/AmpImage';
import AmpStoryPage from '/component/amp/AmpStoryPage';

const marquee = keyframes`
  0% {
    transform: rotate(180deg) translateY(-22%);
  }

  100% {
    transform: rotate(180deg) translateY(100%);
  }
`;

const Container = styled.div`
  overflow: hidden;
  position: relative;
`;

const MarqueeText = styled.div`
  animation-duration: 15s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  color: ${({theme}) => theme.colors.white};
  font-size: ${rem(100)};
  margin: 0 ${rem(24)};
  transform: rotate(180deg);
  white-space: nowrap;
  writing-mode: vertical-lr;

  [active] & {
    animation-name: ${marquee};
  }
`;

const ImageContainer = styled.div`
  grid-row-start: 2;
  grid-row-end: span 2;
  display: flex;
  align-self: center;
  height: 100%;
  width: 100%;
`;

const Image = styled((props) => <AmpImage {...props} />)`
  & img {
    object-fit: cover;
    object-position: left;
  }
`;

const StoryPage7 = () => {
  return (
    <AmpStoryPage id="StoryPage7" backgroundColor="green">
      <amp-story-grid-layer template="fill">
        <AmpImage
          layout="fixed"
          src="/static/stories/millennials/noodle_bowl_bkgd.png"
          width="1707"
          height="2506"
        />
      </amp-story-grid-layer>
      <amp-story-grid-layer
        template="fill"
        style={{backgroundColor: 'black', opacity: 0.4}}
      />
      <amp-story-grid-layer template="thirds" style={{padding: '0 0 0 30px'}}>
        <ImageContainer>
          <Image
            layout="flex-item"
            src="/static/stories/millennials/noodle_bowl.jpg"
          />
        </ImageContainer>
      </amp-story-grid-layer>
      <amp-story-grid-layer template="fill">
        <Container>
          <MarqueeText>
            • PASTA • OATMEAL • AVOCADO • PIZZA • SUSHI • RAMEN • BURGER
          </MarqueeText>
        </Container>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage7;
