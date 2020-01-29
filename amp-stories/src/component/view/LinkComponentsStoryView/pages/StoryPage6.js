import React from 'react';
import styled from 'styled-components';

import {
  TextHighlightBannerLg as SharedTextHighlighBannerLg,
  TextLg,
  Button as SharedButton,
} from '../shared';
import {BannerWrapper} from '/component/base/TextHighlight';
import AmpStoryPage from '/component/amp/AmpStoryPage';

const TextHighlightBannerLg = styled(SharedTextHighlighBannerLg)`
  transform: rotate(4deg);
`;

const Button = styled(SharedButton)`
  position: absolute;
  left: 32px;
  right: 32px;
  bottom: 32px;
`;
const StoryPage6 = () => (
  <AmpStoryPage id="ad-media" backgroundColor="storiesBkLolliPink">
    <amp-story-grid-layer template="vertical">
      <div animate-in="fly-in-top" animate-in-duration="0.3s">
        <div animate-in="fade-in" animate-in-duration="0.3s">
          <TextLg>
            Ads
            <br />
            can use
          </TextLg>
        </div>
      </div>
      <BannerWrapper>
        <div animate-in="rotate-in-right">
          <TextHighlightBannerLg style={{transform: 'rotate(4deg)'}}>
            videos
          </TextHighlightBannerLg>
        </div>
        <div animate-in="rotate-in-left">
          <TextHighlightBannerLg
            style={{transform: 'rotate(4deg) translateX(50px)'}}
          >
            photos
          </TextHighlightBannerLg>
        </div>
      </BannerWrapper>
      <div
        animate-in="fade-in"
        animate-in-duration="0.3s"
        animate-in-delay="0.3s"
        animate-in-timing-function="ease-out"
      >
        <TextLg>
          so you can
          <br />
          be creative
        </TextLg>
      </div>
    </amp-story-grid-layer>
    <amp-story-cta-layer>
      <Button href="https://amp.dev/">Read our documentation</Button>
    </amp-story-cta-layer>
  </AmpStoryPage>
);

export default StoryPage6;
