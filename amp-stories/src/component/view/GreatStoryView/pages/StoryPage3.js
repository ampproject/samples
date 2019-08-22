import * as React from 'react';
import styled from 'styled-components';

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
  position: relative;
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

const ImageContainer = styled.div`
  display: flex;
`;

const StoryPage3 = () => {
  return (
    <AmpStoryPage id="great-story" backgroundColor="storiesPink">
      <amp-story-grid-layer
        template="vertical"
        style={{
          gridTemplateColumns: '1fr',
          gridTemplateRows: '1fr 1fr',
        }}
      >
        <TextContainer>
          <AnimationWrapper style={{zIndex: 2}}>
            <Text>But first, what</Text>
          </AnimationWrapper>
          <AnimationWrapper animate-in-delay="0.1s" style={{zIndex: 1}}>
            <Text animate-in-delay="0.1s">makes a great</Text>
          </AnimationWrapper>
          <AnimationWrapper animate-in-delay="0.2s" style={{zIndex: 0}}>
            <Text animate-in-delay="0.2s">story?</Text>
          </AnimationWrapper>
        </TextContainer>
        <ImageContainer>
          <AmpImage
            layout="fixed"
            src="/static/stories/story1/question.svg"
            height="250px"
            width="143px"
            animate-in="twirl-in"
          />
          <AmpImage
            layout="fixed"
            src="/static/stories/story1/question.svg"
            height="250px"
            width="143px"
            animate-in="twirl-in"
            animate-in-delay="0.2s"
          />
          <AmpImage
            layout="fixed"
            src="/static/stories/story1/question.svg"
            height="250px"
            width="143px"
            animate-in="twirl-in"
            animate-in-delay="0.1s"
          />
        </ImageContainer>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage3;
