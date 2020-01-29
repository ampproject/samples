import React from 'react';

import AmpStoryPage from '/component/amp/AmpStoryPage';
import AmpImage from '/component/amp/AmpImage';
import {
  TextHighlightBanner,
  Text,
  ZoomFadeAnimation,
  BoxPileContainer,
  HighlightPileContainer,
  FillGrid,
  NoEdgeThirdsLayer,
  PaddedUpperThird,
} from '../shared';

const StoryPage4 = () => (
  <AmpStoryPage id="and-more" backgroundColor="storiesBkGreen">
    <NoEdgeThirdsLayer>
      <PaddedUpperThird grid-area="upper-third">
        <Text>In the meantime, we have some cool features in the pipe</Text>
      </PaddedUpperThird>
      <div grid-area="middle-third">
        <BoxPileContainer>
          <FillGrid>
            <AmpImage
              src="/static/stories/story6/6b.png"
              style={{transform: 'rotate(-8deg)'}}
              layout="fixed"
              height="262px"
              width="184px"
            />
          </FillGrid>
          <FillGrid>
            <AmpImage
              src="/static/stories/story6/6c.png"
              style={{transform: 'rotate(-2deg)'}}
              layout="fixed"
              height="181px"
              width="321px"
            />
          </FillGrid>
          <ZoomFadeAnimation width="319px" height="181px">
            <AmpImage
              src="/static/stories/story6/6d.png"
              style={{transform: 'rotate(-14deg)'}}
              layout="fixed"
              height="181px"
              width="319px"
            />
          </ZoomFadeAnimation>
        </BoxPileContainer>
      </div>
      <div grid-area="lower-third">
        <HighlightPileContainer>
          <FillGrid>
            <TextHighlightBanner
              style={{
                transform: 'rotate(4deg) translateX(44px)',
                opacity: '0.6',
              }}
            >
              embeds
            </TextHighlightBanner>
          </FillGrid>
          <FillGrid>
            <TextHighlightBanner
              style={{
                transform: 'rotate(-18deg) translateX(-35px)',
                opacity: '0.6',
              }}
            >
              youtube
            </TextHighlightBanner>
          </FillGrid>
          <ZoomFadeAnimation delay="0.3s">
            <TextHighlightBanner>and more</TextHighlightBanner>
          </ZoomFadeAnimation>
        </HighlightPileContainer>
      </div>
    </NoEdgeThirdsLayer>
  </AmpStoryPage>
);

export default StoryPage4;
