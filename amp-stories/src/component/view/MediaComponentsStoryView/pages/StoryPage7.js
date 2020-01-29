import React from 'react';

import AmpStoryPage from '/component/amp/AmpStoryPage';
import {TextHighlightBanner} from '../shared';
import {BannerWrapper} from '/component/base/TextHighlight';

const backgroundSrcs = [
  {
    src: '/static/stories/story3/sizzle.m3u8',
    type: 'application/x-mpegurl',
  },
  {
    src: '/static/stories/story3/sizzle.mp4',
    type: 'video/mp4',
  },
];

const StoryPage7 = () => (
  <AmpStoryPage
    id="full-screen-video"
    backgroundColor="storiesBkLightBlue"
    auto-advance-after="sizzle"
  >
    <amp-story-grid-layer template="fill">
      <amp-video
        id="sizzle"
        layout="fill"
        autoplay=""
        poster="https://via.placeholder.com/720x1280.png"
        width="720px"
        height="1280px"
        noaudio=""
      >
        {backgroundSrcs.map(({src, type}) => (
          <source key={src} src={src} type={type} />
        ))}
      </amp-video>
    </amp-story-grid-layer>
    <amp-story-grid-layer template="vertical" style={{alignContent: 'end'}}>
      <BannerWrapper>
        <TextHighlightBanner>You can also go</TextHighlightBanner>
        <TextHighlightBanner>full screen and</TextHighlightBanner>
        <TextHighlightBanner>auto advance to</TextHighlightBanner>
        <TextHighlightBanner>the next screen</TextHighlightBanner>
      </BannerWrapper>
    </amp-story-grid-layer>
  </AmpStoryPage>
);

export default StoryPage7;
