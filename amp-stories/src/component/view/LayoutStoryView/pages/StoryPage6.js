import * as React from 'react';
import styled from 'styled-components';
import {rem} from 'polished';

import AmpStoryPage from '/component/amp/AmpStoryPage';

const AnimationWrapper = styled((props) => (
  <div animate-in="fly-in-top" {...props} />
))`
  margin: 6px 0;
`;

const TextContainer = styled((props) => (
  <div
    animate-in="fade-in"
    animate-in-duration="0.7s"
    animate-in-timing-function="cubic-bezier(1, 0.01, 0.44, 1.09)"
    {...props}
  />
))`
  align-items: center;
  background-color: ${({theme}) => theme.colors.storiesBlue};
  display: flex;
  justify-content: center;
  height: 100%;
`;

const Text = styled((props) => <p {...props} />)`
  color: ${({theme}) => theme.colors.white};
  font-size: ${rem(32)};
  text-align: center;
  width: 180px;
`;

const StoryPage6 = () => {
  return (
    <AmpStoryPage id="story-page-6" backgroundColor="storiesBkBlue">
      <amp-story-grid-layer
        template="thirds"
        style={{padding: '30px', position: 'relative'}}
      >
        <AnimationWrapper style={{zIndex: 2}}>
          <TextContainer>
            <Text>And even divide the screen into</Text>
          </TextContainer>
        </AnimationWrapper>
        <AnimationWrapper animate-in-delay="0.1s" style={{zIndex: 1}}>
          <TextContainer animate-in-delay="0.1s">
            <Text style={{fontSize: '120px'}}>3</Text>
          </TextContainer>
        </AnimationWrapper>
        <AnimationWrapper animate-in-delay="0.2s" style={{zIndex: 0}}>
          <TextContainer animate-in-delay="0.2s">
            <Text>equally sized rows</Text>
          </TextContainer>
        </AnimationWrapper>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage6;
