import * as React from 'react';
import {rem} from 'polished';
import styled, {keyframes, css} from 'styled-components';

import AmpImage from '/component/amp/AmpImage';
import AmpStoryPage from '/component/amp/AmpStoryPage';

import Confetti from '/component/base/Confetti';

import {AbsoluteContainer, HeadingSerif, Text as SharedText} from './shared';

const ANIMATION_DURATION = 3;

const EMOJI_IMGS = [
  '/static/stories/millennials/emoji_crying@2x.png',
  '/static/stories/millennials/emoji_laughing@2x.png',
  '/static/stories/millennials/emoji_oh@2x.png',
];

const shift = keyframes`
  0%, 100% {
    opacity: 1;
    transform: translateX(70%);
  }
  33% {
    opacity: 1;
    transform: translateX(0%);
  }
  66% {
    opacity: 0;
    transform: translateX(-100%);
  }
  75% {
    opacity: 0;
    transform: translateX(120%)
  }
`;

const TopContainer = styled((props) => <div {...props} />)`
  grid-row-start: 1;
  grid-row-end: 1;
  place-self: end;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const AssetContainer = styled.div`
  flex-grow: 1;
  position: relative;
`;
const BottomContainer = styled((props) => <div {...props} />)`
  grid-row-start: 2;
  grid-row-end: 2;
  place-self: end;
`;

const Title = styled((props) => <HeadingSerif {...props} />)`
  font-weight: 900;
  color: ${({theme}) => theme.colors.orange};
  font-size: ${rem(16)};
  margin-bottom: ${rem(20)};
`;

const Text = styled(SharedText)`
  margin: ${rem(10)} 0 ${rem(10)} ${rem(100)};
  color: #092626;
  font-size: ${rem(20)};
`;

// eslint-disable-next-line no-unused-vars
const EmojiImage = styled(({key, index, length, ...props}) => (
  <AmpImage {...props} />
))`
  transform: translateX(120%);

  & img {
    object-fit: contain;
  }

  [active] & {
    animation: ${({index, length}) =>
      css`${shift} ${ANIMATION_DURATION}s ease ${(ANIMATION_DURATION * index) /
        length}s infinite`};
  }
`;

const StoryPage13 = () => {
  return (
    <AmpStoryPage id="StoryPage13" backgroundColor="yellow">
      <amp-story-grid-layer
        template="vertical"
        style={{gridTemplateRows: '1fr 1fr'}}
      >
        <TopContainer>
          <Title>Expression</Title>
          <AssetContainer>
            <div style={{position: 'absolute', top: 0, left: 0}}>
              <Confetti preset="basic" color="rose" />
            </div>
            <div style={{position: 'absolute', right: 0, top: 0}}>
              <Confetti preset="small" color="orange" />
            </div>
            <AbsoluteContainer>
              {EMOJI_IMGS.map((imgSrc, i) => (
                <EmojiImage
                  layout="fill"
                  src={imgSrc}
                  key={imgSrc}
                  index={i}
                  length={EMOJI_IMGS.length}
                />
              ))}
            </AbsoluteContainer>
          </AssetContainer>
        </TopContainer>
        <BottomContainer>
          <Text>
            It's also about self-expression. Millennials favour communicating
            their emotion through imagery more-so than any generation before
            them.
          </Text>
        </BottomContainer>
      </amp-story-grid-layer>
    </AmpStoryPage>
  );
};

export default StoryPage13;
