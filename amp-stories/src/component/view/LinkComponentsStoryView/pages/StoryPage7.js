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

const CopyContainer = styled.div`
  background: linear-gradient(0deg, black, transparent);
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NestText = styled.div`
  font-size: ${rem(18)};
  font-weight: 700;
  color: white;
  text-align: center;
`;

const GetItNowButton = styled.div`
  padding: 8px 20px;
  color: #0076ff;
  font-weight: 700;
  font-size: ${rem(16)};
  border-radius: 50px;
  width: fit-content;
  width: -moz-fit-content;
  justify-self: center;
  box-shadow: #00000078 0 2px 4px 0;
  background-color: white;
`;

const Badge = styled(AmpImage)`
  animation: ${rotate} 10s linear infinite;
`;

const backgroundSrcs = [
  {
    src: '/static/stories/story5/Nest_cam.m3u8',
    type: 'application/x-mpegurl',
  },
  {
    src: '/static/stories/story5/Nest_cam.mp4',
    type: 'video/mp4',
  },
];

const posterSrc = '/static/stories/story5/Nest_cam.png';

const StoryPage7 = () => (
  <AmpStoryPage
    id="ad2"
    backgroundColor="storiesBkLolliPink"
    auto-advance-after="ad2-video"
  >
    <amp-story-grid-layer template="fill">
      <amp-video
        id="ad2-video"
        layout="fill"
        autoplay=""
        poster={posterSrc}
        width="720"
        height="1280"
      >
        {backgroundSrcs.map(({src, type}) => (
          <source key={src} src={src} type={type} />
        ))}
      </amp-video>
    </amp-story-grid-layer>
    <amp-story-grid-layer template="vertical">
      <CenteredStackedContainer>
        <BadgeText>
          Video Ad
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
    <amp-story-grid-layer
      template="vertical"
      style={{alignContent: 'end', padding: '0'}}
    >
      <CopyContainer>
        <NestText style={{marginBottom: '20px'}}>
          Nest Cam IQ
          <br />
          It doesn't just watch home. It
          <br />
          helps out there too
        </NestText>
        <GetItNowButton>Get it now</GetItNowButton>
      </CopyContainer>
    </amp-story-grid-layer>
  </AmpStoryPage>
);

export default StoryPage7;
