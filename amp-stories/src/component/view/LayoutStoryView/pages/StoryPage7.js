import * as React from 'react';
import styled, {keyframes} from 'styled-components';
import {rem} from 'polished';

import AmpStoryPage from '/component/amp/AmpStoryPage';

const clockwise = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Column = styled((props) => <div {...props} />)`
  background-color: #d3dcff;
  height: 100%;
  width: 40px;
`;

const TextContainer = styled((props) => <div {...props} />)`
  align-items: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  grid-row-end: lower-third;
  grid-row-start: lower-third;
  justify-content: center;
  margin: 6px 0;
`;

const Text = styled.p`
  color: ${({theme}) => theme.colors.storiesBlue};
  font-size: ${rem(32)};
  margin: 6px 0;
  text-align: center;
`;

const TextLineBefore = styled(Text)`
  &:before {
    content: '-------  ';
    letter-spacing: -2px;
  }
`;

const TextLineAfter = styled(Text)`
  &:after {
    content: '  -------';
    letter-spacing: -2px;
  }
`;

const AnimationContainer = styled((props) => <div {...props} />)`
  align-self: center;
  grid-row-end: middle-third;
  grid-row-start: upper-third;
  place-self: center;
`;

const SquareContainer = styled((props) => <div {...props} />)`
  animation: ${clockwise} 20s 1s linear infinite;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: 200px;
  width: 200px;
`;

const Square = styled.div`
  border: ${({theme}) => theme.colors.storiesBlue} 18px solid;
  margin: 6px;
`;

const StoryPage7 = () => {
  return (
    <AmpStoryPage id="story-page-7" backgroundColor="storiesBkBlue">
      <amp-story-grid-layer
        template="horizontal"
        style={{
          justifyContent: 'space-evenly',
          padding: 0,
          background: 'linear-gradient(rgba(255,255,255,0), #d3dcff)',
        }}
      >
        <Column animate-in="fade-in" animate-in-delay="0.1s" />
        <Column animate-in="fade-in" animate-in-delay="0.15s" />
        <Column animate-in="fade-in" animate-in-delay="0.2s" />
        <Column animate-in="fade-in" animate-in-delay="0.25s" />
        <Column animate-in="fade-in" animate-in-delay="0.3s" />
        <Column animate-in="fade-in" animate-in-delay="0.35s" />
      </amp-story-grid-layer>
      <amp-story-grid-layer template="thirds">
        <AnimationContainer animate-in="twirl-in" animate-in-delay="0.6s">
          <SquareContainer animate-in="fade-in">
            <Square />
            <Square />
            <Square />
            <Square />
          </SquareContainer>
        </AnimationContainer>
        <TextContainer animate-in="fade-in" animate-in-delay="0.6s">
          <TextLineBefore>So there isn't</TextLineBefore>
          <TextLineAfter>any limit</TextLineAfter>
          <Text>to your creativity</Text>
        </TextContainer>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage7;
