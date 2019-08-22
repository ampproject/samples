import React from 'react';
import styled from 'styled-components';

import AmpStoryPage from '/component/amp/AmpStoryPage';
import AmpImage from '/component/amp/AmpImage';
import {TextHighlightBanner} from '../shared';
import {BannerWrapper} from '/component/base/TextHighlight';

const PhotoPileWrapper = styled.div`
  grid-row-start: upper-third;
  grid-row-end: middle-third;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
  position: relative;
`;

const PilePhoto = ({width, height, delay, id, src, rotate, after}) => {
  return (
    <div
      id={id}
      animate-in="fade-in"
      animate-in-duration="0.4s"
      animate-in-delay={delay}
      animate-in-after={after}
      animate-in-timing-function="ease-in-out"
      style={{gridArea: '1 / 1 / 1 / 1', width, height}}
    >
      <div
        animate-in="zoom-out"
        animate-in-duration="0.4s"
        animate-in-delay={delay}
        animate-in-after={after}
        animate-in-timing-function="ease-in-out"
        scale-start="2"
        scale-end="1"
        style={{width, height}}
      >
        <AmpImage
          src={src}
          style={{transform: `rotate(${rotate})`, border: '5px solid white'}}
          height={height}
          width={width}
          layout="fixed"
        />
      </div>
    </div>
  );
};

const StoryPage5 = () => (
  <AmpStoryPage id="photo-pile" backgroundColor="storiesBkLightBlue">
    <amp-story-grid-layer template="thirds">
      <PhotoPileWrapper>
        <PilePhoto
          id="art3"
          src="/static/stories/story3/3E-abstract-art3.jpg"
          delay="0.1s"
          rotate="347deg"
          height="322px"
          width="214px"
        />
        <PilePhoto
          id="art2"
          src="/static/stories/story3/3E-abstract-art2.jpg"
          rotate="350deg"
          after="art3"
          height="210px"
          width="315px"
        />
        <PilePhoto
          id="art1"
          src="/static/stories/story3/3E-abstract-art1.jpg"
          rotate="9deg"
          after="art2"
          height="246px"
          width="246px"
        />
      </PhotoPileWrapper>
      <BannerWrapper grid-area="lower-third" style={{alignSelf: 'end'}}>
        <TextHighlightBanner>You have all the</TextHighlightBanner>
        <TextHighlightBanner>freedom you need</TextHighlightBanner>
        <TextHighlightBanner>to be creative</TextHighlightBanner>
      </BannerWrapper>
    </amp-story-grid-layer>
  </AmpStoryPage>
);

export default StoryPage5;
