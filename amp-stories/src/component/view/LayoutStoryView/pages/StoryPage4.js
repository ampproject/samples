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

const TextColumn = styled((props) => <div {...props} />)`
  justify-content: center;
  background-color: #d3dcff;
  display: flex;
  width: 40px;
`;

const Text = styled((props) => <div {...props} />)`
  color: ${({theme}) => theme.colors.storiesBlue};
  font-size: ${rem(32)};
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StoryPage4 = () => {
  return (
    <AmpStoryPage id="story-page-4" backgroundColor="storiesBkBlue">
      <amp-story-grid-layer template="fill">
        <Border />
      </amp-story-grid-layer>
      <amp-story-grid-layer
        template="horizontal"
        style={{
          padding: `${BORDER_WIDTH + MARGIN_WIDTH}px`,
          justifyContent: 'space-evenly',
          alignItems: 'stretch',
        }}
      >
        <TextColumn animate-in="fade-in" style={{alignItems: 'flex-start'}}>
          <Text animate-in="fly-in-top" style={{paddingTop: '3vh'}}>
            <div>H</div>
            <div>o</div>
            <div>r</div>
          </Text>
        </TextColumn>
        <TextColumn animate-in="fade-in" style={{alignItems: 'center'}}>
          <Text animate-in="fly-in-top" animate-in-delay="0.2s">
            <div>i</div>
            <div>z</div>
            <div>o</div>
            <div>n</div>
          </Text>
        </TextColumn>
        <TextColumn animate-in="fade-in" style={{alignItems: 'flex-end'}}>
          <Text
            animate-in="fly-in-top"
            animate-in-delay="0.2s"
            style={{paddingBottom: '3vh'}}
          >
            <div>t</div>
            <div>a</div>
            <div>l</div>
            <div>l</div>
            <div>y</div>
          </Text>
        </TextColumn>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage4;
