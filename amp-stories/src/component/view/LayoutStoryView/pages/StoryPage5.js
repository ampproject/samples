import * as React from 'react';
import styled from 'styled-components';
import {rem} from 'polished';

import AmpStoryPage from '/component/amp/AmpStoryPage';

const BORDER_WIDTH = 40;
const MARGIN_WIDTH = 30;

const Border = styled.div`
  border: ${({theme}) => `${theme.colors.storiesBlue} ${BORDER_WIDTH}px solid`};
  margin: ${MARGIN_WIDTH}px;
`;

const TextRow = styled((props) => <div {...props} />)`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Line = styled((props) => <div {...props} />)`
  background-color: #d3dcff;
  height: ${BORDER_WIDTH}px;
`;

const Text = styled((props) => <div {...props} />)`
  color: ${({theme}) => theme.colors.storiesBlue};
  font-size: ${rem(63)};
`;

const StoryPage5 = () => {
  return (
    <AmpStoryPage id="story-page-5" backgroundColor="storiesBkBlue">
      <amp-story-grid-layer template="fill">
        <Border />
      </amp-story-grid-layer>
      <amp-story-grid-layer
        template="vertical"
        style={{padding: `${BORDER_WIDTH + MARGIN_WIDTH}px`}}
      >
        <TextRow style={{marginTop: `${BORDER_WIDTH}px`}}>
          <Text animate-in="fade-in" animate-in-delay="0.4s">
            Ver-
          </Text>
        </TextRow>
        <Line animate-in="fade-in" animate-in-delay="0.1s" />
        <TextRow>
          <Text animate-in="fade-in" animate-in-delay="0.5s">
            -tic-
          </Text>
        </TextRow>
        <Line animate-in="fade-in" animate-in-delay="0.2s" />
        <TextRow>
          <Text animate-in="fade-in" animate-in-delay="0.6s">
            -ally
          </Text>
        </TextRow>
        <Line animate-in="fade-in" animate-in-delay="0.3s" />
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage5;
