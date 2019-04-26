import * as React from 'react';
import styled from 'styled-components';

import {device} from '/util/device';
import Animation from '/component/amp/Animation';
import PositionObserver from '/component/amp/PositionObserver';
import AmpImage from '/component/amp/AmpImage';

const MachineContainer = styled.div`
  ${device.below.tabletLandscape``};
`;
const Machine = styled.div`
  text-align: center;
  position: relative;
`;
const CardTrack = styled.div`
  overflow: hidden;
  display: block;
  width: 231px;
  height: 600px;
  position: absolute;
  left: 50%;
  top: -372px;
  transform: translateX(-50%);
  z-index: 2;

  clip-path: polygon(0 0, 231px 0, 231px 600px, 0 600px);
`;
const Card = styled(AmpImage)`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
`;
const MachineSlot = styled(AmpImage)`
  position: absolute;
  z-index: 1;
  margin-top: 150px;
  left: 50%;
  transform: translateX(-50%);
`;

class SpendingMachine extends React.Component {
  render() {
    return (
      <MachineContainer>
        <PositionObserver
          id="spendCardObserver"
          instersection-ratios="1"
          on="scroll:spendCardAnim.seekTo(percent=event.percent)"
        />

        <Machine>
          <CardTrack>
            <Card
              id="spendingCard"
              layout="fixed"
              width="231"
              height="370"
              src="/static/spending/credit-card@2x.png"
            />
          </CardTrack>
          <MachineSlot
            layout="fixed"
            width="600"
            height="131"
            src="/static/spending/cash-machine@2x.png"
          />
        </Machine>

        <Animation
          id="spendCardAnim"
          animation={{
            duration: '1',
            fill: 'both',
            direction: 'normal',
            animations: [
              {
                selector: '#spendingCard',
                switch: [
                  {
                    media: '(min-width: 900px)',
                    keyframes: [
                      {
                        transform: 'translate(-50%, 0px)',
                        offset: 0,
                      },
                      {
                        transform: 'translate(-50%, 0px)',
                        offset: 0.25,
                      },
                      {
                        transform: 'translate(-50%, 40vh)',
                        offset: 1,
                      },
                    ],
                  },
                  {
                    media: '(max-width: 899px)',
                    keyframes: [
                      {
                        transform: 'translate(-50%, 0px)',
                        offset: 0,
                      },
                      {
                        transform: 'translate(-50%, 0px)',
                        offset: 0.25,
                      },
                      {
                        transform: 'translate(-50%, 100vw)',
                        offset: 1,
                      },
                    ],
                  },
                ],
              },
            ],
          }}
        />
      </MachineContainer>
    );
  }
}

export default SpendingMachine;
