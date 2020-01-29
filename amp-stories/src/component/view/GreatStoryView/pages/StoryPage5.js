import * as React from 'react';
import styled from 'styled-components';
import {rem} from 'polished';

import AmpImage from '/component/amp/AmpImage';
import AmpStoryPage from '/component/amp/AmpStoryPage';

import {Text as SharedText} from './shared';

const Text = styled(SharedText)`
  font-size: ${rem(30)};
`;
const Heading = styled.h1`
  font-size: ${rem(72)};
  margin: 0;
  color: ${({theme}) => theme.colors.white};
`;

const TextWrapper = styled.div`
  margin: 3px 0;
`;

const TextContainer = styled.div`
  align-self: self-end;
  grid-row-start: middle-third;
  grid-row-end: lower-third;
`;

const StoryPage5 = () => {
  return (
    <AmpStoryPage id="visually-interesting" backgroundColor="storiesPink">
      <amp-story-grid-layer template="fill">
        <AmpImage
          layout="fixed"
          src="/static/stories/story1/visual-bg.jpg"
          height="5172px"
          width="3448px"
        />
      </amp-story-grid-layer>
      <amp-story-grid-layer
        template="vertical"
        style={{
          gridTemplateColumns: '1fr',
          gridTemplateRows: '1fr 1fr 1fr',
        }}
      >
        <TextContainer>
          <Heading>Make it</Heading>
          <TextWrapper>
            <Text>Visually</Text>
          </TextWrapper>
          <TextWrapper>
            <Text>interesting</Text>
          </TextWrapper>
          <TextWrapper>
            <Text>and use qualitative</Text>
          </TextWrapper>
          <TextWrapper>
            <Text>assets</Text>
          </TextWrapper>
        </TextContainer>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage5;
