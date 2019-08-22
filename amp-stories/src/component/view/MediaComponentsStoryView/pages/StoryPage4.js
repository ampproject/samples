import React from 'react';
import styled from 'styled-components';
import {rem} from 'polished';

import AmpStoryPage from '/component/amp/AmpStoryPage';
import AmpImage from '/component/amp/AmpImage';
import {TextHighlightBanner} from '../shared';
import {BannerWrapper} from '/component/base/TextHighlight';

const DocsButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  &:active,
  &:hover,
  &:link,
  &:visited,
  & {
    color: ${({theme}) => theme.colors.storiesLightBlue};
    font-weight: 700;
  }

  font-size: ${rem(16)};
  background-color: transparent;
  border: 2px solid ${({theme}) => theme.colors.storiesLightBlue};
  height: 54px;
`;

const GradientLayer = styled(({className, ...rest}) => (
  <amp-story-grid-layer template="vertical" class={className} {...rest} />
))`
  padding: 0;
  align-content: end;
`;
const Gradient = styled.div`
  height: 213px;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
`;

const StoryPage4 = () => (
  <AmpStoryPage id="pan-image" backgroundColor="storiesBkLightBlue">
    <amp-story-grid-layer template="fill">
      <AmpImage
        animate-in="pan-right"
        animate-in-duration="10s"
        src="/static/stories/story3/3D-1280h.jpg"
        layout="fixed"
        width="1920"
        height="1280"
      />
    </amp-story-grid-layer>
    <GradientLayer>
      <Gradient />
    </GradientLayer>
    <amp-story-grid-layer template="vertical" style={{alignContent: 'end'}}>
      <BannerWrapper>
        <TextHighlightBanner>And spice things</TextHighlightBanner>
        <TextHighlightBanner>up with effects</TextHighlightBanner>
      </BannerWrapper>
      <DocsButton href="https://amp.dev/documentation/examples/visual-effects/amp_story_animations/?format=stories">
        Check out documentation
      </DocsButton>
    </amp-story-grid-layer>
  </AmpStoryPage>
);

export default StoryPage4;
