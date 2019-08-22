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

const StoryPage3 = () => (
  <AmpStoryPage id="youtube" backgroundColor="storiesBkGreen">
    <NoEdgeThirdsLayer>
      <PaddedUpperThird grid-area="upper-third">
        <Text>In the meantime, we have some cool features in the pipe</Text>
      </PaddedUpperThird>
      <div grid-area="middle-third">
        <BoxPileContainer>
          <FillGrid>
            <AmpImage
              id="bottom"
              src="/static/stories/story6/6b.png"
              style={{transform: 'rotate(-8deg)'}}
              layout="fixed"
              height="262px"
              width="184px"
            />
          </FillGrid>

          <ZoomFadeAnimation width="321px" height="181px">
            <AmpImage
              id="bottom"
              src="/static/stories/story6/6c.png"
              style={{transform: 'rotate(-2deg)'}}
              layout="fixed"
              height="181px"
              width="321px"
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
                opacity: '0.75',
              }}
            >
              embeds
            </TextHighlightBanner>
          </FillGrid>

          <ZoomFadeAnimation delay="0.3s">
            <TextHighlightBanner
              style={{transform: 'rotate(-18deg) translateX(-35px)'}}
            >
              youtube
            </TextHighlightBanner>
          </ZoomFadeAnimation>
        </HighlightPileContainer>
      </div>
    </NoEdgeThirdsLayer>
  </AmpStoryPage>
);

export default StoryPage3;
