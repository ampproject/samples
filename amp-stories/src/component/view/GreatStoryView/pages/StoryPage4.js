import * as React from 'react';
import styled, {keyframes} from 'styled-components';
import {rem} from 'polished';

import AmpStoryPage from '/component/amp/AmpStoryPage';

const wave = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 448px 0;
  }
`;

const clockwise = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Squiggly = styled.div`
  width: inherit;
  margin: 12px 0;
  position: relative;
  height: 24px;
  background: url('/static/stories/story1/squiggly.svg') repeat-x 0%;
  background-size: contain;
  animation: 10s ${wave} linear infinite;
`;

const Text = styled.div`
  display: block;
  font-size: ${rem(56)};
  color: ${({theme}) => theme.colors.storiesRed};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
`;

const RotatingLine = styled.div`
  top: 24px;
  right: -62px;
  height: 24px;
  width: 124px;
  background-color: ${({theme}) => theme.colors.storiesRed};
  border-radius: 15px;
  z-index: -1;
  position: absolute;
  animation ${clockwise} 12s linear infinite;
`;

const StoryPage4 = () => {
  return (
    <AmpStoryPage id="story-quality" backgroundColor="storiesPink">
      <amp-story-grid-layer template="fill">
        <div>
          <RotatingLine />
        </div>
      </amp-story-grid-layer>
      <amp-story-grid-layer
        template="vertical"
        style={{
          gridTemplateColumns: '1fr',
          gridTemplateRows: '1fr 1fr',
        }}
      >
        <Container style={{alignSelf: 'self-end'}}>
          <Text>Focus on</Text>
          <Text>the story</Text>
          <Text>
            quality.
            <Squiggly />
          </Text>
        </Container>
        <Container style={{alignSelf: 'self-start'}}>
          <Text>Make sure</Text>
          <Text>it's</Text>
          <Text>compelling</Text>
        </Container>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage4;
