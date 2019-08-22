import React from 'react';
import styled from 'styled-components';

import AmpStoryPage from '/component/amp/AmpStoryPage';
import {TextHighlightBanner} from '../shared';
import {BannerWrapper} from '/component/base/TextHighlight';

const topVideoBkSrcs = [
  {
    src: '/static/stories/story3/raining-donuts.m3u8',
    type: 'application/x-mpegurl',
  },
  {
    src: '/static/stories/story3/raining-donuts.mp4',
    type: 'video/mp4',
  },
];

const bottomVideoBkSrcs = [
  {
    src: '/static/stories/story3/flour-shake.m3u8',
    type: 'application/x-mpegurl',
  },
  {
    src: '/static/stories/story3/flour-shake.mp4',
    type: 'video/mp4',
  },
];

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 8px;
  padding: 8px;
  padding-top: 23px;
`;

const TopVidContainer = styled.div`
  position: relative;
  & video {
    object-fit: cover;
    object-position: 100%;
    transform: rotate(180deg);
  }
`;

const BottomVidContainer = styled.div`
  position: relative;
  & video {
    object-fit: cover;
    object-position: 32%;
  }
`;

const StoryPage6 = () => (
  <AmpStoryPage id="videos" backgroundColor="storiesBkLightBlue">
    <amp-story-grid-layer template="fill">
      <LayoutContainer>
        <TopVidContainer>
          <amp-video
            layout="fill"
            loop=""
            autoplay=""
            noaudio=""
            poster="https://via.placeholder.com/720x1280.png"
          >
            {topVideoBkSrcs.map(({src, type}) => (
              <source key={src} src={src} type={type} />
            ))}
          </amp-video>
        </TopVidContainer>
        <BottomVidContainer>
          <amp-video
            layout="fill"
            loop=""
            autoplay=""
            noaudio=""
            poster="https://via.placeholder.com/720x1280.png"
          >
            {bottomVideoBkSrcs.map(({src, type}) => (
              <source key={src} src={src} type={type} />
            ))}
          </amp-video>
        </BottomVidContainer>
      </LayoutContainer>
    </amp-story-grid-layer>
    <amp-story-grid-layer template="vertical" style={{alignContent: 'end'}}>
      <BannerWrapper>
        <TextHighlightBanner>Embed multiple</TextHighlightBanner>
        <TextHighlightBanner>videos</TextHighlightBanner>
        <TextHighlightBanner>simultaneously</TextHighlightBanner>
      </BannerWrapper>
    </amp-story-grid-layer>
  </AmpStoryPage>
);

export default StoryPage6;
