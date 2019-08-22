import React from 'react';
import styled, {keyframes} from 'styled-components';
import {rem} from 'polished';
import AmpStoryPage from '/component/amp/AmpStoryPage';

const LargeText = styled((props) => <div {...props} />)`
  font-size: ${rem(60)};
  line-height: 1.2;
  font-weight: 700;
  color: ${({theme}) => theme.colors.storiesOrange};
`;

const textKeyframes = keyframes`
from {
  transform: translateY(0);
}

33% {
  transform: translateY(-100vh);
}

66% {
  transform: translateY(-200vh);
}

to {
  transform: translateY(-300vh);
}
`;

const TextContainer = styled((props) => <div {...props} />)`
  [active] & {
    animation: ${textKeyframes} 6s 0s cubic-bezier(0.72, -0.01, 0.21, 1)
      forwards;
  }
`;

const StoryPage3 = () => (
  <AmpStoryPage id="scroll-text" backgroundColor="storiesBkOrange">
    <amp-story-grid-layer template="vertical">
      <TextContainer>
        {[
          'Fade in',
          'Fly in',
          'Rotate',
          'Drop in',
          'Woosh in',
          'Zoom in',
          'Pan Up',
          'Twirl in',
          'Fade in',
          'Fly in',
          'Rotate',
          'Drop in',
          'Woosh in',
          'Zoom in',
          'Pan Up',
          'Twirl in',
          'Fade in',
          'Fly in',
          'Rotate',
          'Drop in',
          'Woosh in',
          'Zoom in',
          'Pan Up',
          'Twirl in',
          'Fade in',
          'Fly in',
          'Rotate',
          'Drop in',
          'Woosh in',
          'Zoom in',
          'Pan Up',
          'Twirl in',
          'Fade in',
          'Fly in',
          'Rotate',
          'Drop in',
          'Woosh in',
          'Zoom in',
          'Pan Up',
          'Twirl in',
          'Fade in',
          'Fly in',
          'Rotate',
          'Drop in',
          'Woosh in',
          'Zoom in',
          'Pan Up',
          'Twirl in',
        ].map((trans) => (
          <LargeText key={trans}>{trans}</LargeText>
        ))}
      </TextContainer>
    </amp-story-grid-layer>
  </AmpStoryPage>
);

export default StoryPage3;
