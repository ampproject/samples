import React from 'react';

import AmpStoryPage from '/component/amp/AmpStoryPage';
import AmpImage from '/component/amp/AmpImage';
import {TextHighlightBanner} from '../shared';
import {BannerWrapper} from '/component/base/TextHighlight';

const StoryPage3 = () => (
  <AmpStoryPage id="full-screen" backgroundColor="storiesBkLightBlue">
    <amp-story-grid-layer template="fill">
      <AmpImage
        src="/static/stories/story3/3C-ratio.png"
        layout="responsive"
        width="9"
        height="16"
      />
    </amp-story-grid-layer>
    <amp-story-grid-layer template="vertical">
      <BannerWrapper>
        <TextHighlightBanner style={{paddingRight: '30px'}}>
          Go full screen
        </TextHighlightBanner>
        <TextHighlightBanner>for an immersive</TextHighlightBanner>
        <TextHighlightBanner>feeling</TextHighlightBanner>
      </BannerWrapper>
    </amp-story-grid-layer>
  </AmpStoryPage>
);

export default StoryPage3;
