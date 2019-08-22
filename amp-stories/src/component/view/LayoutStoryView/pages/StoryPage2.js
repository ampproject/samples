import * as React from 'react';
import styled from 'styled-components';
import {rem} from 'polished';

import AmpStoryPage from '/component/amp/AmpStoryPage';

import {Text as SharedText} from './shared';

const Container = styled.div`
  align-items: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Box = styled.div`
  position: relative;
`;

const Line = styled((props) => <div {...props} />)`
  border-color: ${({theme}) => theme.colors.storiesBlue};
  border-style: solid;
  height: 100%;
  position: absolute;
  width: 100%;
`;

const TextContainer = styled((props) => <div {...props} />)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 210px;
  margin: 60px;
  width: 210px;
`;

const Text = styled((props) => <SharedText {...props} />)`
  margin: 3px 0;
  font-size: ${rem(27)};
`;

const StoryPage2 = () => {
  return (
    <AmpStoryPage id="story-page-2" backgroundColor="storiesBkBlue">
      <amp-story-grid-layer template="fill">
        <Container>
          <Box>
            <Line
              animate-in="fade-in"
              animate-in-delay="0.2s"
              style={{borderTopWidth: '40px'}}
            />
            <Line
              animate-in="fade-in"
              animate-in-delay="0.3s"
              style={{borderRightWidth: '40px'}}
            />
            <Line
              animate-in="fade-in"
              animate-in-delay="0.4s"
              style={{borderBottomWidth: '40px'}}
            />
            <Line
              animate-in="fade-in"
              animate-in-delay="0.5s"
              style={{borderLeftWidth: '40px'}}
            />
            <TextContainer animate-in="fade-in">
              <Text style={{width: '189px'}} animate-in="fly-in-top">
                AMP allows
              </Text>
              <Text animate-in="fly-in-top">you to layout</Text>
              <Text animate-in="fly-in-top">your content</Text>
              <Text animate-in="fly-in-top">really easily</Text>
            </TextContainer>
          </Box>
        </Container>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage2;
