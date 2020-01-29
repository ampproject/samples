import React from 'react';
import AmpStoryPage from '/component/amp/AmpStoryPage';
import AmpImage from '/component/amp/AmpImage';
import {
  TextHighlightBanner,
  Text,
  ZoomFadeAnimation,
  BoxPileContainer,
  HighlightPileContainer,
  NoEdgeThirdsLayer,
  PaddedUpperThird,
} from '../shared';

const StoryPage2 = () => (
  <AmpStoryPage id="embeds" backgroundColor="storiesBkGreen">
    <NoEdgeThirdsLayer>
      <PaddedUpperThird grid-area="upper-third">
        <Text>In the meantime, we have some cool features in the pipe</Text>
      </PaddedUpperThird>

      <div grid-area="middle-third">
        <BoxPileContainer>
          <ZoomFadeAnimation height="262px" width="184px">
            <AmpImage
              src="/static/stories/story6/6b.png"
              style={{transform: 'rotate(-8deg)'}}
              layout="fixed"
              height="262px"
              width="184px"
            />
          </ZoomFadeAnimation>
        </BoxPileContainer>
      </div>
      <div grid-area="lower-third">
        <HighlightPileContainer>
          <ZoomFadeAnimation delay="0.3s">
            <TextHighlightBanner
              style={{transform: 'rotate(4deg) translateX(44px)'}}
            >
              embeds
            </TextHighlightBanner>
          </ZoomFadeAnimation>
        </HighlightPileContainer>
      </div>
    </NoEdgeThirdsLayer>
  </AmpStoryPage>
);

export default StoryPage2;
