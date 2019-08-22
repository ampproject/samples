import * as React from 'react';
import styled from 'styled-components';
import {rem} from 'polished';

import AmpImage from '/component/amp/AmpImage';
import AmpStoryPage from '/component/amp/AmpStoryPage';

import {Text as SharedText} from './shared';

const AnimationWrapper = styled((props) => {
  return (
    <div
      animate-in="fly-in-top"
      animate-in-timing-function="cubic-bezier(0.0, 0.0, 0.2, 1)"
      {...props}
    />
  );
})`
  display: block;
  margin: 3px 0px;
`;

const Text = styled((props) => (
  <SharedText
    animate-in="fade-in"
    animate-in-duration="0.7s"
    animate-in-timing-function="cubic-bezier(1, 0.01, 0.44, 1.09)"
    {...props}
  />
))``;

const TextContainer = styled.div`
  align-self: center;
`;

const ImagePositioningContainer = styled((props) => <div {...props} />)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled((props) => <div {...props} />)`
  height: 330px;
  width: 330px;
`;

const Circle = styled((props) => <div {...props} />)`
  z-index: -1
  background-color: ${({theme}) => theme.colors.white}
  width: 330px;
  height: 330px;
  border-radius: 50%;
  position: absolute;
`;

const Heading = styled(Text)`
  font-size: ${rem(64)};
`;

const EndText = styled((props) => <div {...props} />)`
  font-size: ${rem(64)};
  position: absolute;
  width: 330px;
  height: 330px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({theme}) => theme.colors.storiesRed};
`;

const StoryPage7 = () => {
  return (
    <AmpStoryPage id="end-strong" backgroundColor="storiesPink">
      <amp-story-grid-layer
        template="vertical"
        style={{
          gridTemplateColumns: '1fr',
          gridTemplateRows: '1fr 1fr',
        }}
      >
        <TextContainer>
          <AnimationWrapper style={{zIndex: 2}}>
            <Heading>Lastly</Heading>
          </AnimationWrapper>
          <AnimationWrapper animate-in-delay="0.1s" style={{zIndex: 1}}>
            <Text animate-in-delay="0.2s">Be sure to have a</Text>
          </AnimationWrapper>
          <AnimationWrapper animate-in-delay="0.2s" style={{zIndex: 0}}>
            <Text animate-in-delay="0.3s">strong ending</Text>
          </AnimationWrapper>
        </TextContainer>
        <ImagePositioningContainer>
          <ImageContainer animate-in="fade-in">
            <AmpImage
              layout="fixed"
              src="/static/stories/story1/confetti.svg"
              height="339px"
              width="366px"
              style={{position: 'absolute'}}
              animate-in="zoom-in"
              scale-start="0.001"
              scale-end="1"
              animate-in-timing-function="cubic-bezier(0,1,.2,1.14)"
              animate-in-duration="2s"
              animate-in-delay="0.3s"
            />
            <Circle
              animate-in="zoom-in"
              scale-start="0.001"
              scale-end="1"
              animate-in-timing-function="cubic-bezier(0,1.34,.16,1.13)"
              animate-in-duration="4s"
              animate-in-delay="0s"
            />
            <EndText>end</EndText>
          </ImageContainer>
        </ImagePositioningContainer>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage7;
