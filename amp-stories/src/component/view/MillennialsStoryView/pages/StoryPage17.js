import * as React from 'react';
import styled from 'styled-components';

import AmpImage from '/component/amp/AmpImage';
import AmpStoryPage from '/component/amp/AmpStoryPage';

const TopContainer = styled.div`
  grid-row-start: 1;
  grid-row-end: 2;
  height: 100%;
  width: 100%;
  padding: 0 40px;
`;

const BottomContainer = styled((props) => <div {...props} />)`
  grid-row-start: 2;
  grid-row-end: 3;
  height: 100%;
  width: 100%;
  padding: 100px;
  transform: rotate(12deg) scale(0.75);
`;

const StoryPage17 = () => {
  return (
    <AmpStoryPage id="StoryPage17" backgroundColor="violet">
      <amp-story-grid-layer template="thirds">
        <TopContainer>
          <AmpImage
            src="/static/stories/millennials/postage_stamp.png"
            layout="responsive"
            width="238px"
            height="304px"
          />
        </TopContainer>
        <BottomContainer
          animate-in="fade-in"
          animate-in-duration="0.4s"
          animate-in-timing-function="ease-in-out"
        >
          <AmpImage
            src="/static/stories/millennials/stamp.png"
            layout="responsive"
            width="322px"
            height="307px"
            animate-in="zoom-out"
            animate-in-duration="0.4s"
            animate-in-timing-function="ease-in-out"
            scale-start="2"
            scale-end="1"
          />
        </BottomContainer>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage17;
