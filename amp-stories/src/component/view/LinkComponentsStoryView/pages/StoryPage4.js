import React from 'react';
import styled from 'styled-components';

import {TextHighlightBannerLg, TextLg} from '../shared';
import AmpStoryPage from '/component/amp/AmpStoryPage';

// wrapping a div like this is required to get the
// animate-in amp attributes to work properly
const CenteredFlex = styled((props) => <div {...props} />)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StoryPage4 = () => (
  <AmpStoryPage id="childs-play" backgroundColor="storiesBkLolliPink">
    <amp-story-grid-layer template="fill">
      <CenteredFlex>
        <div>
          <div animate-in="fly-in-top" animate-in-duration="0.3s">
            <CenteredFlex animate-in="fade-in" animate-in-duration="0.3s">
              <TextLg>Just like</TextLg>
              <TextLg>links, Ads</TextLg>
              <TextLg>are a</TextLg>
            </CenteredFlex>
          </div>
          <div
            animate-in="zoom-out"
            animate-in-delay="0.1s"
            animate-in-duration="0.3s"
            scale-start="2"
            scale-end="1"
          >
            <div
              animate-in="fade-in"
              animate-in-timing-function="ease-out"
              animate-in-delay="0.1s"
              animate-in-duration="0.3s"
              style={{margin: '10px 0'}}
            >
              <TextHighlightBannerLg style={{transform: 'rotate(4deg)'}}>
                child's play
              </TextHighlightBannerLg>
            </div>
          </div>
          <CenteredFlex
            animate-in="fade-in"
            animate-in-timing-function="ease-out"
            animate-in-delay="0.4s"
            animate-in-duration="0.3s"
          >
            <TextLg>to add to</TextLg>
            <TextLg>your</TextLg>
            <TextLg>stories</TextLg>
          </CenteredFlex>
        </div>
      </CenteredFlex>
    </amp-story-grid-layer>
  </AmpStoryPage>
);

export default StoryPage4;
