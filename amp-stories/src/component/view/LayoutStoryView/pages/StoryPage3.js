import * as React from 'react';
import styled from 'styled-components';
import {rem} from 'polished';

import AmpStoryPage from '/component/amp/AmpStoryPage';

const Container = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 30px;
`;

const ExpandingBox = styled.div`
  align-items: center;
  align-self: center;
  background-color: ${({theme}) => theme.colors.storiesBlue};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  transition: transform 0.5s;
  transform: scaleY(0);
  width: 100%;
`;

const Page = styled((props) => <AmpStoryPage {...props} />)`
  &[active] ${ExpandingBox} {
    transform: scaleY(1);
  }
`;

const TextContainer = styled((props) => <div {...props} />)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Text = styled((props) => <div {...props} />)`
  margin: 3px 0;
  color: ${({theme}) => theme.colors.white};
  font-size: ${rem(32)};
`;

const StoryPage3 = () => {
  return (
    <Page id="story-page-3" backgroundColor="storiesBkBlue">
      <amp-story-grid-layer template="fill">
        <Container>
          <ExpandingBox />
        </Container>
      </amp-story-grid-layer>
      <amp-story-grid-layer template="fill">
        <Container>
          <TextContainer animate-in="fade-in">
            <Text animate-in="fly-in-top">You can fill</Text>
            <Text animate-in="fly-in-top">the entire</Text>
            <Text animate-in="fly-in-top">screen or</Text>
            <Text animate-in="fly-in-top">go...</Text>
          </TextContainer>
        </Container>
      </amp-story-grid-layer>
    </Page>
  );
};

export default StoryPage3;
