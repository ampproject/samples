import * as React from 'react';
import styled from 'styled-components';

import {device} from '/util/device';
import Animation from '/component/amp/Animation';
import OrientationObserver from '/component/amp/OrientationObserver';
import PositionObserver from '/component/amp/PositionObserver';
import Text from '/component/base/Text';
import Hidable from '/component/base/Hidable';

const ClockContainer = styled.div`
  ${device.below.tabletLandscape``};
`;
const Letter = styled(Text.Title)`
  font-size: 180px;
  line-height: 1.2em;
  display: block;
  ${device.below.tabletLandscape`
    display: inline-block;
    font-size: 30vw;
  `};
`;
const Clock = styled.div`
  position: relative;
  ${device.below.tabletLandscape`display: inline-block;`};
`;
const Hand = styled.div`
  background: ${({theme}) => theme.colors.flushOrange};
  position: absolute;
  width: 10px;
  transform-origin: 50% 5px;
  border-radius: 5px 5px 0 0;
  top: calc(50% + 5px);
  left: calc(50% - 5px);
  transform: rotate(-180deg);
  ${device.below.tabletLandscape`
    width: 6px;
    transform-origin: 50% 3px;
    border-radius: 3px 3px 0 0;
    top: calc(50% + 3px);
    left: calc(50% - 3px);
  `};
`;
Hand.Hour = styled(Hand)`
  transform: rotate(-90deg);
  height: 33px;
  ${device.below.tabletLandscape`
    height: 5vw;
  `};
`;
Hand.Minute = styled(Hand)`
  height: 50px;
  ${device.below.tabletLandscape`
    height: 7vw;
  `};
`;
const ClockBackground = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border: 8px solid;
  border-radius: 1000px;
  border-color: ${({theme}) => theme.colors.flushOrange};
  background: linear-gradient(rgba(252, 119, 0, 0), rgba(252, 119, 0, 0.5));
  ${device.below.tabletLandscape`
    width: 25vw;
    height: 25vw;
  `};
`;

class WorkClock extends React.Component {
  render() {
    return (
      <ClockContainer>
        <Letter>W</Letter>
        <Clock>
          <ClockBackground />
          <Hidable hideFor={device.below.tabletLandscape}>
            <Hand.Hour id="desktop-hour-hand" />
            <Hand.Minute id="desktop-minute-hand" />
          </Hidable>

          <Hidable hideFor={device.above.tabletLandscape}>
            <Hand.Hour id="mobile-hour-hand" />
            <Hand.Minute id="mobile-minute-hand" />
          </Hidable>
        </Clock>
        <Letter>R</Letter>
        <Letter>K</Letter>

        {/* Desktop Hour hand */}
        <PositionObserver
          instersection-ratios="0"
          on={'scroll:desktopHourAnim.seekTo(percent=event.percent)'}
        />
        <Animation
          id="desktopHourAnim"
          animation={{
            duration: '3s',
            fill: 'both',
            direction: 'alternate',
            animations: [
              {
                selector: '#desktop-hour-hand',
                keyframes: [
                  {
                    transform: 'rotate(-270deg)',
                  },
                  {
                    transform: 'rotate(-90deg)',
                  },
                ],
              },
            ],
          }}
        />

        {/* Desktop Minute hand */}
        <PositionObserver
          instersection-ratios="0"
          on={'scroll:desktopMinuteAnim.seekTo(percent=event.percent)'}
        />
        <Animation
          id="desktopMinuteAnim"
          animation={{
            duration: '3s',
            fill: 'both',
            direction: 'alternate',
            animations: [
              {
                selector: '#desktop-minute-hand',
                keyframes: [
                  {
                    transform: 'rotate(-180deg)',
                  },
                  {
                    transform: 'rotate(1080deg)',
                  },
                ],
              },
            ],
          }}
        />

        {/* Hour hand: phone vertical, like a clock on the wall */}
        <OrientationObserver on="gamma:mobileHourAnim.seekTo(percent=event.percent)" />
        <Animation
          id="mobileHourAnim"
          animation={{
            duration: '3s',
            fill: 'both',
            direction: 'alternate',
            animations: [
              {
                selector: '#mobile-hour-hand',
                keyframes: [
                  {
                    transform: 'rotate(-270deg)',
                  },
                  {
                    transform: 'rotate(-90deg)',
                  },
                ],
              },
            ],
          }}
        />

        {/* Minute hand: phone flat to vertical, movement toward and away from user */}
        <OrientationObserver
          beta-range="0 180"
          on="beta:mobileMinuteAnim.seekTo(percent=event.percent)"
        />
        <Animation
          id="mobileMinuteAnim"
          animation={{
            duration: '3s',
            fill: 'both',
            direction: 'alternate',
            animations: [
              {
                selector: '#mobile-minute-hand',
                keyframes: [
                  {
                    transform: 'rotate(-180deg)',
                  },
                  {
                    transform: 'rotate(1080deg)',
                  },
                ],
              },
            ],
          }}
        />
      </ClockContainer>
    );
  }
}

export default WorkClock;
