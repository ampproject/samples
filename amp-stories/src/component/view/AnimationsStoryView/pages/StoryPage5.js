import React from 'react';
import styled, {keyframes} from 'styled-components';
import AmpStoryPage from '/component/amp/AmpStoryPage';
import {TextHighlightBanner} from '../shared';
import {BannerWrapper} from '/component/base/TextHighlight';
import AmpImage from '/component/amp/AmpImage';
import {secondsToPercents} from '/util/secondsToPercents';

const Shape = styled(AmpImage).attrs(() => ({
  layout: 'fixed',
}))``;

const TIMING_FUNC = 'cubic-bezier(0.25, 0.1, 0.25, 1)';

const ShapeWrapper = styled.div`
  height: 300px;
  width: 230px;
  position: relative;
  grid-area: 1/1/1/1;
`;

const bigCircleInnerKeyframes = keyframes`${secondsToPercents(`
0s, 1.9s {
  opacity: 1;
  transform: translate(0,0);
}

2.1s {
  opacity: 1;
  transform: translate(-100px, 0);
}

2.2s, 2.7s {
  opacity: 1;
  transform: translate(-199px, -96px);
}

`)}`;

const bigCircleOuterKeyframes = keyframes`${secondsToPercents(`
0s {
  opacity: 0;
  transform: translateY(-100vh);
}

0.3s, 1s {
  opacity: 1;
  transform: translateY(0) rotate(0deg);
}

1.6s, 2.2s {
  opacity: 1;
  transform: translateY(0) rotate(130deg);
}

2.35s {
  opacity: 1;
  transform: translate(0, 160px) rotate(130deg);
}

2.6s, 2.7s {
  opacity: 0;
  transform: translate(-188px, 160px)  rotate(130deg);
}
`)}`;

const BigCircleSVG = styled(Shape).attrs(() => ({
  src: '/static/stories/story2/big-circle.svg',
  width: '120px',
  height: '120px',
}))`
  position: absolute;
  top: 132px;
  left: 32px;
  [active] & {
    animation: ${bigCircleInnerKeyframes} 2.7s 0s ${TIMING_FUNC} infinite;
  }
`;

const BigCircle = styled((props) => {
  return (
    <ShapeWrapper {...props}>
      <BigCircleSVG />
    </ShapeWrapper>
  );
})`
  [active] & {
    animation: ${bigCircleOuterKeyframes} 2.7s 0s ${TIMING_FUNC} infinite;
  }
`;

const mediumOuterKeyframes = keyframes`${secondsToPercents(`
0s, 0.3s {
  opacity: 0;
  transform: translateY(-100vh);
}

0.55s, 1.15s {
  opacity: 1;
  transform: translateY(0) rotate(0deg);
}

1.75s, 2.4s {
  opacity: 1;
  transform: translate(0) rotate(130deg);
}

2.7s {
  opacity: 0;
  transform: translate(-240px,40px) rotate(130deg);
}
`)}`;

const MediumCircleSVG = styled(Shape).attrs(() => ({
  src: '/static/stories/story2/medium-circle.svg',
  width: '60px',
  height: '60px',
}))`
  position: absolute;
  top: 53px;
  left: 114px;
`;

const MediumCircle = styled((props) => {
  return (
    <ShapeWrapper {...props}>
      <MediumCircleSVG />
    </ShapeWrapper>
  );
})`
  [active] & {
    animation: ${mediumOuterKeyframes} 2.7s 0s ${TIMING_FUNC} infinite;
  }
`;

const smallOuterKeyframes = keyframes`${secondsToPercents(`
0s, 0.45s {
  opacity: 0;
  transform: translateY(-100vh);
}

0.7s, 1.1s {
  opacity: 1;
  transform: translateY(0) rotate(0deg);
}

1.9s, 2.3s {
  opacity: 1;
  transform: translate(0) rotate(130deg);
}

2.6s, 2.7s {
  opacity: 0;
  transform: translate(-240px,40px) rotate(130deg);
}
`)}`;

const SmallCircleSVG = styled(Shape).attrs(() => ({
  src: '/static/stories/story2/small-circle.svg',
  width: '54px',
  height: '54px',
}))`
  position: absolute;
  top: 36px;
  left: 49px;
`;

const SmallCircle = styled((props) => {
  return (
    <ShapeWrapper {...props}>
      <SmallCircleSVG />
    </ShapeWrapper>
  );
})`
  [active] & {
    animation: ${smallOuterKeyframes} 2.7s 0s ${TIMING_FUNC} infinite;
  }
`;

const ShapeContainer = styled.div`
  grid-row-start: upper-third;
  grid-row-end: middle-third;
  position: relative;
  display: grid;
  justify-content: center;
  align-items: center;
`;

const StoryPage5 = () => (
  <AmpStoryPage id="advanced-animations" backgroundColor="storiesBkOrange">
    <amp-story-grid-layer template="thirds">
      <ShapeContainer>
        <BigCircle />
        <MediumCircle />
        <SmallCircle />
      </ShapeContainer>
      <div grid-area="lower-third" align-self="end">
        <BannerWrapper>
          <TextHighlightBanner style={{paddingRight: '20px'}}>
            And create
          </TextHighlightBanner>
          <TextHighlightBanner style={{paddingRight: '20px'}}>
            advanced
          </TextHighlightBanner>
          <TextHighlightBanner style={{paddingRight: '30px'}}>
            animations and
          </TextHighlightBanner>
          <TextHighlightBanner style={{paddingRight: '30px'}}>
            transitions
          </TextHighlightBanner>
        </BannerWrapper>
      </div>
    </amp-story-grid-layer>
  </AmpStoryPage>
);

export default StoryPage5;
