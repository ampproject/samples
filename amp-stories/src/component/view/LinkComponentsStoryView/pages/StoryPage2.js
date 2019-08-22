import React from 'react';
import styled from 'styled-components';

import {TextHighlightBanner, Button as SharedButton} from '../shared';
import {BannerWrapper as SharedBannerWrapper} from '/component/base/TextHighlight';
import AmpStoryPage from '/component/amp/AmpStoryPage';

const Button = styled(SharedButton)`
  position: absolute;
  bottom: 32px;
  left: 32px;
  right: 32px;
`;

const BannerWrapper = styled(SharedBannerWrapper)`
  position: absolute;
  bottom: 16%;
  left: 32px;
`;

const backgroundSrcs = [
  {
    src: '/static/stories/story5/background-page2.m3u8',
    type: 'application/x-mpegurl',
  },
  {
    src: '/static/stories/story5/background-page2.mp4',
    type: 'video/mp4',
  },
];

const posterSrc = '/static/stories/story5/background-page2.png';

const StoryPage2 = () => (
  <AmpStoryPage id="click-link" backgroundColor="storiesBkLolliPink">
    <amp-story-grid-layer template="fill">
      <amp-video
        layout="fill"
        loop=""
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
    <amp-story-grid-layer template="fill">
      <div>
        <BannerWrapper>
          <TextHighlightBanner>You can link out</TextHighlightBanner>
          <TextHighlightBanner>to external</TextHighlightBanner>
          <TextHighlightBanner>content</TextHighlightBanner>
        </BannerWrapper>
      </div>
    </amp-story-grid-layer>
    <amp-story-cta-layer>
      <Button href="https://amp.dev/about/stories/" inverted>
        Click me
      </Button>
    </amp-story-cta-layer>
  </AmpStoryPage>
);

export default StoryPage2;
