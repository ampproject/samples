import React from 'react';
import styled from 'styled-components';
import AmpStoryPage from '/component/amp/AmpStoryPage';
import AmpImage from '/component/amp/AmpImage';
import {TextHighlightBanner} from '../shared';
import {BannerWrapper} from '/component/base/TextHighlight';

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  margin: 8px;
`;

const ImageContainer = styled.div`
  position: relative;
  & img {
    object-fit: cover;
  }
`;

const StoryPage2 = () => (
  <AmpStoryPage id="display-multiple" backgroundColor="storiesBkLightBlue">
    <amp-story-grid-layer template="fill">
      <ImageGrid>
        <ImageContainer style={{gridColumn: 'span 2'}}>
          <AmpImage
            src="/static/stories/story3/3B-abstract-art.jpg"
            layout="fill"
          />
        </ImageContainer>
        <ImageContainer>
          <AmpImage
            src="/static/stories/story3/3B-pineapple.jpg"
            layout="fill"
          />
        </ImageContainer>
        <ImageContainer>
          <AmpImage
            src="/static/stories/story3/3B-abstract-art2.jpg"
            layout="fill"
          />
        </ImageContainer>
      </ImageGrid>
    </amp-story-grid-layer>
    <amp-story-grid-layer template="vertical" style={{alignContent: 'end'}}>
      <BannerWrapper>
        <TextHighlightBanner>Display multiple</TextHighlightBanner>
        <TextHighlightBanner>images on the</TextHighlightBanner>
        <TextHighlightBanner>same screen</TextHighlightBanner>
      </BannerWrapper>
    </amp-story-grid-layer>
  </AmpStoryPage>
);

export default StoryPage2;
