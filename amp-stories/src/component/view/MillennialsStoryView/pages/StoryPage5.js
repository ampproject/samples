import * as React from 'react';
import styled, {keyframes} from 'styled-components';
import {rem} from 'polished';

import AmpImage from '/component/amp/AmpImage';
import AmpStoryPage from '/component/amp/AmpStoryPage';

import {Text as SharedText} from './shared';

const ICONS = {
  MARKER_WHITE: '/static/stories/millennials/location.svg',
  MARKER_RED: '/static/stories/millennials/location_red.svg',
};

const Text = styled(SharedText)`
  color: ${({theme}) => theme.colors.white};
  padding: 10px 20px;
  font-size: ${rem(24)};

  ${({icon}) =>
    icon
      ? `
        &:before {
          content: url(${icon});
          width: 8px;
          height: 8px;
          margin-right: ${rem(5)};
        }
      `
      : ''}
`;

const Pill = styled.div`
  background: ${({pillStyle, theme}) => {
    let background;

    switch (pillStyle) {
      case 'gradient':
        background = 'linear-gradient(45deg, #fc7d7b, #8e78ff)';
        break;
      case 'grey':
        background = 'rgba(152, 146, 155, 0.5)';
        break;
      case 'white':
      default:
        background = theme.colors.white;
        break;
    }

    return background;
  }};
  display: inline-block;
  border-radius: ${rem(38)};

  ${({pillStyle}) =>
    pillStyle === 'white'
      ? `
        & ${Text} {
          background: linear-gradient(45deg, #fc7d7b, #8e78ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `
      : ''}
`;

const ListItem = styled.li`
  margin: 10px 0;
  opacity: 0;
  transform: scale(0.8) translateY(-50px);
`;

const Page = styled(AmpStoryPage)`
  &[active] ${ListItem} {
    opacity: 1;
    transition: 0.3s ease-out;
    transition-property: opacity, transform;
    transform: translateY(0);
  }

  &[active] ${ListItem}:nth-child(9) {
    transition-delay: 200ms;
  }
  &[active] ${ListItem}:nth-child(8) {
    transition-delay: 400ms;
  }
  &[active] ${ListItem}:nth-child(7) {
    transition-delay: 800ms;
  }
  &[active] ${ListItem}:nth-child(6) {
    transition-delay: 1200ms;
  }
  &[active] ${ListItem}:nth-child(5) {
    transition-delay: 1400ms;
  }
  &[active] ${ListItem}:nth-child(4) {
    transition-delay: 1600ms;
  }
  &[active] ${ListItem}:nth-child(3) {
    transition-delay: 1800ms;
  }
  &[active] ${ListItem}:nth-child(2) {
    transition-delay: 2000ms;
  }
  &[active] ${ListItem}:nth-child(1) {
    transition-delay: 2200ms;
  }
`;

const waveKeyframes = keyframes`
  0%, 60%, 100% {
    transform: initial;
  }

  30% {
    transform: translateY(-15px);
  }
`;

const Wave = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
  height: 50px;
  align-items: center;
`;

const Dot = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 3px;
  background: #d8d8d8;

  [active] & {
    animation: ${waveKeyframes} 1.3s linear infinite;
  }

  &:nth-child(2) {
    animation-delay: -1.1s;
  }

  &:nth-child(3) {
    animation-delay: -0.9s;
  }
`;

const StoryPage5 = () => {
  return (
    <Page id="StoryPage5" backgroundColor="storiesBlue">
      <amp-story-grid-layer template="fill">
        <AmpImage
          layout="fixed"
          src="/static/stories/millennials/landscape_bkgd.png"
          width="720"
          height="1280"
        />
      </amp-story-grid-layer>
      <amp-story-grid-layer template="vertical" style={{alignContent: 'end'}}>
        <ul>
          <ListItem>
            <Pill pillStyle="gradient">
              <Text>#tripadventure</Text>
            </Pill>
          </ListItem>
          <ListItem>
            <Pill pillStyle="grey">
              <Text>#nofilter</Text>
            </Pill>
          </ListItem>
          <ListItem>
            <Pill pillStyle="white">
              <Text>#trip</Text>
            </Pill>
          </ListItem>
          <ListItem>
            <Pill pillStyle="grey">
              <Text>#landscape</Text>
            </Pill>
          </ListItem>
          <ListItem>
            <Pill pillStyle="gradient">
              <Text icon={ICONS.MARKER_WHITE}>Joffres Lake, BC</Text>
            </Pill>
          </ListItem>
          <ListItem>
            <Pill pillStyle="grey">
              <Text icon={ICONS.MARKER_WHITE}>Paris, France</Text>
            </Pill>
          </ListItem>
          <ListItem>
            <Pill pillStyle="grey">
              <Text icon={ICONS.MARKER_WHITE}>Beaver falls</Text>
            </Pill>
          </ListItem>
          <ListItem>
            <Pill pillStyle="white">
              <Text icon={ICONS.MARKER_RED}>Geierlay, Germany</Text>
            </Pill>
          </ListItem>
          <ListItem>
            <Pill pillStyle="white">
              <Wave>
                <Dot />
                <Dot />
                <Dot />
              </Wave>
            </Pill>
          </ListItem>
        </ul>
      </amp-story-grid-layer>
    </Page>
  );
};

export default StoryPage5;
