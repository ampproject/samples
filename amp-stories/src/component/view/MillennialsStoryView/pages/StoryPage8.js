import * as React from 'react';
import styled from 'styled-components';

import AmpImage from '/component/amp/AmpImage';
import AmpStoryPage from '/component/amp/AmpStoryPage';

import {Text} from './shared';

const ImageContainer = styled.div`
  grid-row-start: 2;
  grid-row-end: span 2;
  margin-right: 30px;
  display: flex;
  align-self: center;
  height: 100%;
  width: 100%;
`;

const Image = styled((props) => <AmpImage {...props} />)`
  & img {
    object-fit: cover;
    object-position: right;
  }
`;
const StoryPage8 = () => {
  return (
    <AmpStoryPage id="StoryPage8" backgroundColor="green">
      <amp-story-grid-layer template="fill">
        <AmpImage
          layout="fixed"
          src="/static/stories/millennials/noodle_bowl_bkgd.png"
          width="1707"
          height="2506"
        />
      </amp-story-grid-layer>
      <amp-story-grid-layer template="thirds" style={{padding: '0 30px 0 0'}}>
        <ImageContainer>
          <Image
            layout="flex-item"
            src="/static/stories/millennials/noodle_bowl.jpg"
          />
        </ImageContainer>
      </amp-story-grid-layer>
      <amp-story-grid-layer template="vertical" style={{alignContent: 'top'}}>
        <Text>
          Or to capture their latest meal and let the world know about a new
          restaurant.
        </Text>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage8;
