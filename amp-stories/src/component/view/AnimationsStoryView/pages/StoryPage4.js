import React from 'react';
import styled, {keyframes} from 'styled-components';
import AmpStoryPage from '/component/amp/AmpStoryPage';
import {TextHighlightBanner} from '../shared';
import {BannerWrapper} from '/component/base/TextHighlight';
import AmpImage from '/component/amp/AmpImage';
import {secondsToPercents} from '/util/secondsToPercents';

const TIMING_FUNC = 'cubic-bezier(0.25, 0.1, 0.25, 1)';
const SHAPE_DIM = 60;
const SHAPE_PADDING = 15;
const SHAPE_GROUP_LENGTH = SHAPE_DIM * 4 + SHAPE_PADDING * 3;

const Shape = styled(AmpImage).attrs(() => ({
  layout: 'fixed',
  height: '60px',
  width: '60px',
}))`
  display: block;
  margin-bottom: 15px;
`;

const circleKeyframe = keyframes`${secondsToPercents(`
0s, 0.2s {
   opacity: 0;
   transform: translate(0, -100vh);
}

0.5s, 1.5s {
  opacity: 1;
  transform: translate(0, 0);
}

1.8s, 2.3s {
  opacity: 1;
  transform: translate(calc(${SHAPE_DIM / 2}px - ${SHAPE_GROUP_LENGTH /
  2}px),0);
}

2.6s, 3.6s {
  opacity: 1;
  transform: translate(0,0);
}

3.9s, 4.6s {
  opacity: 1;
  transform: translate(calc(${SHAPE_DIM / 2}px - ${SHAPE_GROUP_LENGTH /
  2}px), 0);
}

4.9s {
  transform: translate(calc(${SHAPE_DIM / 2}px - ${SHAPE_GROUP_LENGTH /
  2}px), calc(100% + 15px));
  opacity: 1;
}

5.2s {
  transform: translate(calc(${SHAPE_DIM / 2}px - ${SHAPE_GROUP_LENGTH /
  2}px), 120vw);
  opacity: 0;
}
`)}`;

const triangleKeyframe = keyframes`${secondsToPercents(`
0s, 0.15s {
   opacity: 0;
   transform: translate(0, -100vh);
}

0.45s, 1.5s {
  opacity: 1;
  transform: translate(0, 0);
}

1.8s, 2.3s {
  opacity: 1;
  transform: translate(calc(${SHAPE_GROUP_LENGTH / 2}px - ${SHAPE_DIM /
  2}px - ${SHAPE_PADDING}px),0);
}

2.6s, 3.5s {
  opacity: 1;
  transform: translate(0,0);
}

3.9s, 4.6s {
  opacity: 1;
  transform: translate(calc(${SHAPE_DIM / 2}px - ${SHAPE_GROUP_LENGTH /
  2}px + (1 * 15px + 60px)), 0);
}

4.9s {
  transform: translate(calc(${SHAPE_DIM / 2}px - ${SHAPE_GROUP_LENGTH /
  2}px + (1 * 15px + 60px)), 0);
  opacity: 1;
}

5.2s {
  transform: translate(calc(${SHAPE_DIM / 2}px - ${SHAPE_GROUP_LENGTH /
  2}px + (1 * 15px + 60px)), 120vw);
  opacity: 0;
}

`)}`;

const rectangleKeyframe = keyframes`${secondsToPercents(`
0s, 0.1s {
   opacity: 0;
   transform: translate(0, -100vh);
}

0.4s, 1.5s {
  opacity: 1;
  transform: translate(0, 0);
}

1.8s, 2.45s {
  opacity: 1;
  transform: translate(calc(${SHAPE_DIM / 2}px - ${SHAPE_GROUP_LENGTH /
  2}px + ${SHAPE_PADDING}px),0);
}

2.75s, 3.5s {
  opacity: 1;
  transform: translate(0,0);
}

3.9s, 4.5s {
  opacity: 1;
  transform: translate(calc(${SHAPE_DIM / 2}px - ${SHAPE_GROUP_LENGTH /
  2}px + 2 * (15px + 60px)), 0);
}

4.9s {
  transform: translate(calc(${SHAPE_DIM / 2}px - ${SHAPE_GROUP_LENGTH /
  2}px + 2 * (15px + 60px)), calc(-100% - 15px));
  opacity: 1;
}

5.2s {
  transform: translate(calc(${SHAPE_DIM / 2}px - ${SHAPE_GROUP_LENGTH /
  2}px + 2 * (15px + 60px)), 120vw);
  opacity: 0;
}
`)}`;

const pentagonKeyframe = keyframes`${secondsToPercents(`
0s {
   opacity: 0;
   transform: translate(0, -100vh);
}

0.3s, 1.5s {
  opacity: 1;
  transform: translate(0, 0);
}

1.8s, 2.45s {
  opacity: 1;
  transform: translate(calc(${SHAPE_GROUP_LENGTH / 2}px - ${SHAPE_DIM /
  2}px),0);
}

2.75s, 3.5s {
  opacity: 1;
  transform: translate(0,0);
}

3.9s, 4.6s  {
  opacity: 1;
  transform: translate(calc(${SHAPE_DIM / 2}px - ${SHAPE_GROUP_LENGTH /
  2}px + 3 * (15px + 60px)), 0);
}

4.9s {
  transform: translate(calc(${SHAPE_DIM / 2}px - ${SHAPE_GROUP_LENGTH /
  2}px + 3 * (15px + 60px)), calc(-200% - ${SHAPE_DIM / 2}px));
  opacity: 1;
}

5.2s {
  transform: translate(calc(${SHAPE_DIM / 2}px - ${SHAPE_GROUP_LENGTH /
  2}px + 3 * (15px + 60px)), 120vw);
  opacity: 0;
}
`)}`;

const Circle = styled(Shape).attrs(() => ({
  src: '/static/stories/story2/stagger-circle.svg',
}))`
  [active] & {
    animation: ${circleKeyframe} ${5.2}s 0s ${TIMING_FUNC} infinite;
  }
`;

const Triangle = styled(Shape).attrs(() => ({
  src: '/static/stories/story2/stagger-triangle.svg',
}))`
  [active] & {
    animation: ${triangleKeyframe} ${5.2}s 0s ${TIMING_FUNC} infinite;
  }
`;

const Rectangle = styled(Shape).attrs(() => ({
  src: '/static/stories/story2/stagger-rectangle.svg',
}))`
  [active] & {
    animation: ${rectangleKeyframe} ${5.2}s 0s ${TIMING_FUNC} infinite;
  }
`;

const Pentagon = styled(Shape).attrs(() => ({
  src: '/static/stories/story2/stagger-pentagon.svg',
}))`
  [active] & {
    animation: ${pentagonKeyframe} ${5.2}s 0s ${TIMING_FUNC} infinite;
  }
`;

const ShapeContainer = styled.div`
  grid-row-start: middle-third;
  grid-row-end: upper-third;
  justify-self: center;
  padding-top: 32px;
`;

const StoryPage4 = () => (
  <AmpStoryPage id="stagger-animations" backgroundColor="storiesBkOrange">
    <amp-story-grid-layer template="thirds">
      <div grid-area="upper-third">
        <BannerWrapper>
          <TextHighlightBanner>You can also</TextHighlightBanner>
          <TextHighlightBanner>stagger multiple</TextHighlightBanner>
          <TextHighlightBanner>layers to create</TextHighlightBanner>
          <TextHighlightBanner>richer animations</TextHighlightBanner>
        </BannerWrapper>
      </div>
      <ShapeContainer>
        <Circle />
        <Triangle />
        <Rectangle />
        <Pentagon />
      </ShapeContainer>
    </amp-story-grid-layer>
  </AmpStoryPage>
);

export default StoryPage4;
