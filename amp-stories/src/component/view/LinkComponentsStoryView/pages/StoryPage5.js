import React from 'react';
import styled, {keyframes} from 'styled-components';
import {rem} from 'polished';

import AmpStoryPage from '/component/amp/AmpStoryPage';
import AmpImage from '/component/amp/AmpImage';

const CenteredStackedContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
  position: relative;
  justify-self: end;
  width: inherit;
  & > * {
    grid-area: 1 / 1 / 1 / 1;
  }
`;

const BadgeText = styled.div`
  font-size: ${rem(14)};
  font-weight: 700;
  color: white;
  z-index: 1;
  text-align: center;
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;

const PixelText = styled.div`
  font-size: ${rem(18)};
  font-weight: 700;
  color: black;
  text-align: center;
`;

const GetItNowButton = styled.div`
  padding: 8px 20px;
  color: #0076ff;
  font-weight: 700;
  font-size: ${rem(16)};
  border-radius: 50px;
  width: inherit;
  justify-self: center;
  box-shadow: #00000078 0 2px 4px 0;
`;

const Badge = styled(AmpImage)`
  animation: ${rotate} 10s linear infinite;
`;
const StoryPage5 = () => (
  <AmpStoryPage id="ad1" backgroundColor="storiesBkLolliPink">
    <amp-story-grid-layer template="fill">
      <AmpImage
        src="/static/stories/story5/ad1.png"
        width="720"
        height="1280"
        layout="responsive"
      />
    </amp-story-grid-layer>
    <amp-story-grid-layer template="vertical">
      <CenteredStackedContainer>
        <BadgeText>
          Image Ad
          <br />
          Example
        </BadgeText>
        <Badge
          src="/static/stories/story5/badge.svg"
          width="102px"
          height="102px"
          layout="fixed"
        />
      </CenteredStackedContainer>
    </amp-story-grid-layer>
    <amp-story-grid-layer template="vertical" style={{alignContent: 'end'}}>
      <PixelText style={{marginBottom: '20px'}}>
        Get the perfect shoot with the
        <br />
        new Google Pixel 3
      </PixelText>
      <GetItNowButton>Get it now</GetItNowButton>
    </amp-story-grid-layer>
  </AmpStoryPage>
);

export default StoryPage5;
