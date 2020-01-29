import * as React from 'react';
import styled, {keyframes} from 'styled-components';
import {rem} from 'polished';

import AmpImage from '/component/amp/AmpImage';
import AmpStoryPage from '/component/amp/AmpStoryPage';

import {Text as SharedText} from './shared';

const stepOneTop = keyframes`
  0% {
    transform: translateY(0%);
  }
  33%, 100% {
    transform: translateY(-50%)
  }
`;

const stepOneBottom = keyframes`
  0% {
    transform: translateY(0%);
  }
  33%, 100% {
    transform: translateY(50%)
  }
`;

const stepTwoTop = keyframes`
  0%, 33% {
    transform: translateY(0%);
  }
  44%, 100% {
    transform: translateY(-90%)
  }
`;

const stepTwoBottom = keyframes`
  0%, 33% {
    transform: translateY(0%);
  }
  44%, 100% {
    transform: translateY(80%)
  }
`;

const stepThreeTop = keyframes`
  0%, 33% , 44% {
    transform: translateY(0%);
  }
  55%, 100% {
    transform: translateY(-118%)
  }
`;

const stepThreeBottom = keyframes`
  0%, 33%, 44% {
    transform: translateY(0%);
  }
  55%, 100% {
    transform: translateY(103%)
  }
`;

const Container = styled.div`
  position: relative;
  height: 100%
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FoodContainer = styled.div`
  position: relative;
`;

const Text = styled(SharedText)`
  font-weight: 700;
  background-color: ${({theme}) => theme.colors.green};
  font-size: ${rem(100)};
  text-align: center;
  padding: 0 5px;
`;

const AnimatedText = styled(Text)`
  position: absolute;
  top: 0;
  animation-duration: 0.5s;
  animation-iteration-count: once;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  z-index: -1;
`;

const AnimatedText1 = styled(AnimatedText)`
  [active] & {
    animation-name: ${stepOneTop};
  }
`;
const AnimatedText2 = styled(AnimatedText)`
  [active] & {
    animation-name: ${stepOneBottom};
  }
`;
const AnimatedText3 = styled(AnimatedText)`
  [active] & {
    animation-name: ${stepTwoTop};
  }
`;
const AnimatedText4 = styled(AnimatedText)`
  [active] & {
    animation-name: ${stepTwoBottom};
  }
`;
const AnimatedText5 = styled(AnimatedText)`
  [active] & {
    animation-name: ${stepThreeTop};
  }
`;
const AnimatedText6 = styled(AnimatedText)`
  [active] & {
    animation-name: ${stepThreeBottom};
  }
`;

const StoryPage6 = () => {
  return (
    <AmpStoryPage id="StoryPage6" backgroundColor="green">
      <amp-story-grid-layer template="fill">
        <Container>
          <FoodContainer>
            <AnimatedText6>FOOD</AnimatedText6>
            <AnimatedText5>FOOD</AnimatedText5>
            <AnimatedText4>FOOD</AnimatedText4>
            <AnimatedText3>FOOD</AnimatedText3>
            <AnimatedText2>FOOD</AnimatedText2>
            <AnimatedText1>FOOD</AnimatedText1>
            <Text>FOOD</Text>
          </FoodContainer>
        </Container>
      </amp-story-grid-layer>
      <amp-story-grid-layer template="fill">
        <AmpImage
          layout="fixed"
          src="/static/stories/millennials/grain.png"
          width="375"
          height="806"
        />
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage6;
