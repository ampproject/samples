import * as React from 'react';
import styled from 'styled-components';

import AmpImage from '/component/amp/AmpImage';
import AmpStoryPage from '/component/amp/AmpStoryPage';

import Confetti from '/component/base/Confetti';

import {FancyHeading} from './shared';

const Container = styled((props) => <div {...props} />)`
  grid-row-start: 1;
  grid-row-end: 1;
  place-self: center;
`;

const ImageContainer = styled.div`
  grid-row-start: 2;
  grid-row-end: 2;
  height: 100%;
  width: 100%;
  position: relative;
`;

const StoryPage9 = () => {
  return (
    <AmpStoryPage id="StoryPage9" backgroundColor="pink">
      <amp-story-grid-layer
        template="vertical"
        style={{gridTemplateRows: '1fr 1fr'}}
      >
        <Container animate-in="fade-in">
          <FancyHeading animate-in="fly-in-right" style={{color: '#ff0256'}}>
            Creativity
          </FancyHeading>
        </Container>
      </amp-story-grid-layer>
      <amp-story-grid-layer
        template="vertical"
        style={{gridTemplateRows: '1fr 1fr'}}
      >
        <ImageContainer>
          <div style={{position: 'absolute', left: 10, top: -30}}>
            <Confetti preset="basic" color="rose" />
          </div>
          <AmpImage
            layout="responsive"
            src="/static/stories/millennials/creativity_1@2x.png"
            width="415"
            height="326"
          />
        </ImageContainer>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage9;
