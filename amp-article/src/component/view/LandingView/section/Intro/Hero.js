import * as React from 'react';
import styled from 'styled-components';

import {device} from '/util/device';
import PositionObserver from '/component/amp/PositionObserver';
import Animation from '/component/amp/Animation';

const StickyContainer = styled.div`
  height: 170vh;
  margin-bottom: -100vh;
`;

const HeroContainer = styled.div`
  perspective: 200px;
  text-align: center;
  text-transform: uppercase;
  font-family: Oswald;
  font-weight: bold;
  position: sticky;
  top: 2vh;

  ${device.below.tabletLandscape`font-size: 1.5vw;`};
`;
const ZoomyText = styled.div`
  position: relative;
  width: 100%;
  white-space: nowrap;
  padding: 0 25px;
`;
const ZoomUp = styled.div`
  transform-origin: bottom center;
`;
const ZoomDown = styled.div`
  transform-origin: top center;
`;
const Big = styled.div`
  font-size: 125px;
  ${device.below.tabletLandscape`font-size: 12vw;`};
`;
const Bigger = styled.div`
  font-size: 250px;
  ${device.below.tabletLandscape`font-size: 25vw;`};
`;
const Biggest = styled.div`
  font-size: 435px;
  ${device.below.tabletLandscape`font-size: 46vw;`};
`;

class Hero extends React.Component {
  render() {
    return (
      <div style={{position: 'relative'}}>
        <StickyContainer>
          <HeroContainer>
            <ZoomyText>
              <ZoomUp id="zoomUp">
                <Big>Breaking the</Big>
                <Bigger>status</Bigger>
              </ZoomUp>
              <ZoomDown id="zoomDown">
                <Biggest>quo</Biggest>
              </ZoomDown>
            </ZoomyText>

            <PositionObserver on="enter:hideScrollToTopAnim.start; exit:showScrollToTopAnim.start;" />
          </HeroContainer>

          <Animation
            id="testElemAnim"
            animation={{
              duration: '1',
              fill: 'both',
              direction: 'normal',
              animations: [
                {
                  selector: '#bgVid > video',
                  keyframes: [
                    {
                      opacity: 1,
                      offset: 0,
                    },
                    {
                      opacity: 0,
                      offset: 0.5,
                    },
                    {
                      opacity: 0,
                      offset: 1,
                    },
                  ],
                },
                {
                  selector: '#zoomUp',
                  keyframes: [
                    {
                      transform: 'translate3D(0, 0, 0)',
                      offset: 0.4,
                    },
                    {
                      transform: 'translate3D(0, -200vh, 1000px)',
                      offset: 1,
                    },
                  ],
                },
                {
                  selector: '#zoomDown',
                  keyframes: [
                    {
                      transform: 'translate3D(0, 0, 0)',
                      offset: 0.4,
                    },
                    {
                      transform: 'translate3D(0, 200vh, 1000px)',
                      offset: 1,
                    },
                  ],
                },
              ],
            }}
          />
        </StickyContainer>

        <PositionObserver
          id="testElemObserver"
          instersection-ratios="1"
          on="scroll:testElemAnim.seekTo(percent=event.percent)"
        />
      </div>
    );
  }
}

export default Hero;
