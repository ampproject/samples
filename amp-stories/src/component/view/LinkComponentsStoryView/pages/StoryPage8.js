import React from 'react';

import AmpStoryPage from '/component/amp/AmpStoryPage';
import {BannerWrapper} from '/component/base/TextHighlight';
import {TextHighlightBanner} from '../shared';
import FallingConfetti from '../FallingConfetti';

const StoryPage8 = () => (
  <AmpStoryPage id="revenue" backgroundColor="storiesBkLolliPink">
    <amp-story-grid-layer template="vertical">
      <FallingConfetti />
    </amp-story-grid-layer>
    <amp-story-grid-layer template="vertical" style={{alignContent: 'end'}}>
      <BannerWrapper>
        <TextHighlightBanner>And generate</TextHighlightBanner>
        <TextHighlightBanner>revenue easily</TextHighlightBanner>
        <TextHighlightBanner>from your</TextHighlightBanner>
        <TextHighlightBanner>stories</TextHighlightBanner>
      </BannerWrapper>
    </amp-story-grid-layer>
  </AmpStoryPage>
);

export default StoryPage8;
