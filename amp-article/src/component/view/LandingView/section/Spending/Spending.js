import * as React from 'react';
import styled from 'styled-components';

import {device} from '/util/device';
import AmpImage from '/component/amp/AmpImage';
import ParallaxAnimation from '/component/amp/ParallaxAnimation';
import PositionObserver from '/component/amp/PositionObserver';
import Container from '/component/base/Container';
import Text from '/component/base/Text';
import Grid from '/component/base/Grid';
import Confetti, {presets} from '/component/base/Confetti';
import Coin from '/component/base/Coin';
import Bill from '/component/base/Bill';
import MobilePadding from '/component/base/MobilePadding';
import SpendingMachine from './SpendingMachine';

const SpendingSection = styled.section`
  background: ${({theme}) => theme.colors.aquaIsland}
    url('/static/spending/bills-stack@2x.png') no-repeat;
  background-position: center bottom;
  background-size: contain;
  color: ${({theme}) => theme.colors.eden};
  position: relative;
  padding: 500px 0 0;

  ${device.below.tabletLandscape`
    background-size: 180vh;
  `}
`;
const SpendingMachineContainer = styled.div`
  position: absolute;
  top: -250px;
  left: 50%;
  transform: translateX(-50%);
`;
const Title = styled(Text.Title)`
  font-size: 120px;
  ${device.below.tabletLandscape`
    text-align: center;
    font-size: 22vw;
  `};
`;
const Ticket = styled.div`
  background: url('/static/spending/ticket@2x.png') 0 0 no-repeat;
  background-size: contain;
  font-family: 'IBM Plex Mono';
  max-width: 833px;
  margin: 100px auto 0 auto;
  padding: 160px 80px 160px 150px;
  z-index: 2;
  position: relative;

  ${device.below.tabletLandscape`
    background-image: url('/static/spending/ticket-mobile@2x.png');
    background-color: #fff;
    background-size: cover;
    padding: 160px 25px;
  `};
`;
const TicketItem = styled.div`
  line-height: 1.3em;
  max-width: 375px;
  margin: 0 auto;
  padding: 30px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  &:last-child {
    border-bottom: 0px none;
  }
`;
const TicketTitle = styled.div`
  font-size: 24px;
  color: ${({theme}) => theme.colors.black};
  letter-spacing: 0.7px;
  margin-bottom: 10px;
`;
const TicketSubtitle = styled.div`
  font-size: 18px;
  color: ${({theme}) => theme.colors.black};
  opacity: 0.5;
  letter-spacing: 0.5px;
  margin-bottom: 30px;
`;
const TicketCost = styled.div`
  font-size: 32px;
  color: ${({theme}) => theme.colors.persimmon};
  letter-spacing: 0.9px;
  ${device.below.tabletPortrait`font-size: 7vw;`}
`;
const TicketBill = styled(Bill)`
  position: absolute;
  z-index: 1;
  bottom: 290px;
  left: 23%;
  ${device.below.tabletLandscape`
    bottom: 65px;
  `}
`;
const BankContainer = styled.div`
  position: relative;
  height: 1000px;
  ${device.below.tabletLandscape`
    height: 150vh;
  `}
`;
const BankImage = styled(AmpImage)`
  position: absolute;
  left: 55%;
  top: -200px;
  z-index: 6;

  ${device.below.tabletLandscape`
    left: 25%;
    top: 100px;
    zoom: 0.7;
  `}
`;
const Bill1 = styled.div`
  position: absolute;
  top: 36%;
  left: 17%;
  z-index: 2;

  ${device.below.tabletLandscape`
    top: 70%;
    left: -17%;
    zoom: 0.8;
  `}
`;
const Bill2 = styled.div`
  position: absolute;
  top: 140px;
  left: 74%;
  z-index: 1;

  ${device.below.tabletLandscape`
    top: 22%;
    left: -27%;
  `}
`;
const Bill3 = styled.div`
  position: absolute;
  top: 54%;
  left: 68%;
  z-index: 2;

  ${device.below.tabletLandscape`
    top: 35%;
    left: 77%;
  `}
`;

class Spending extends React.Component {
  render() {
    return (
      <SpendingSection>
        <Container>
          <SpendingMachineContainer>
            <SpendingMachine />
          </SpendingMachineContainer>

          <Grid style={{position: 'relative', zIndex: '3'}}>
            <Grid.Col
              cols={2}
              offset={2}
              hideFor={device.below.tabletLandscape}
            >
              <Confetti
                pieces={presets.basic}
                style={{position: 'absolute', left: 10, top: 125}}
                color="persimmon"
              />
            </Grid.Col>
            <Grid.Col
              cols={5}
              colsAtTabletLandscape={12}
              style={{marginTop: '60px'}}
            >
              <Title style={{color: '#fff'}}>SPENDING</Title>
              <Title>HABITS</Title>
            </Grid.Col>
            <Grid.Col cols={3} hideFor={device.below.tabletLandscape}>
              <Confetti
                pieces={presets.basic}
                style={{
                  position: 'absolute',
                  left: -40,
                  top: 95,
                  transform: 'rotate(120deg)',
                }}
                color="persimmon"
              />
            </Grid.Col>
          </Grid>

          <div style={{position: 'relative'}}>
            <Ticket v={20} h={10} id="ticket">
              <PositionObserver
                id="ticketObserver"
                instersection-ratios="1"
                on="scroll:ticketParallaxAnim.seekTo(percent=event.percent)"
              />
              <ParallaxAnimation id="ticketParallaxAnim" selector="#ticket" />

              <TicketItem>
                <TicketTitle>Total Spending</TicketTitle>
                <TicketSubtitle>each year in the US</TicketSubtitle>
                <TicketCost>$600,000,000,000</TicketCost>
              </TicketItem>
              <TicketItem>
                <TicketTitle>Total Spending</TicketTitle>
                <TicketSubtitle>each year in the US</TicketSubtitle>
                <TicketCost>$600,000,000,000</TicketCost>
              </TicketItem>
              <TicketItem>
                <TicketTitle>Student Loan debt</TicketTitle>
                <TicketSubtitle>Student loan debt in the US</TicketSubtitle>
                <TicketCost>$1,000,000,000,000</TicketCost>
              </TicketItem>
              <TicketItem>
                <TicketTitle>Average Yearly Income</TicketTitle>
                <TicketSubtitle>before taxes</TicketSubtitle>
                <TicketCost>$56,099</TicketCost>
              </TicketItem>
              <TicketItem>
                <TicketTitle>Yearly Expenditure</TicketTitle>
                <TicketSubtitle>on average</TicketSubtitle>
                <TicketCost>$47,112</TicketCost>
              </TicketItem>
            </Ticket>

            <TicketBill size={310} angle={109} />
          </div>

          <Grid>
            <Grid.Col
              cols={4}
              offset={2}
              colsAtTabletLandscape={12}
              offsetAtTabletLandscape={0}
            >
              <MobilePadding>
                <Text.P style={{paddingTop: '80px', textAlign: 'left'}}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  tortor justo, facilisis id lobortis ac, elementum et sem. Nam
                  quis turpis eget ipsum fermentum malesuada. Praesent ante
                  metus, dignissim ut ullamcorper vitae, lobortis in enim. Sed
                  nec dapibus dui, eget lobortis enim. Suspendisse vehicula nunc
                  ut ante consequat, at suscipit sapien volutpat. Donec sit amet
                  ante ut tellus vulputate lobortis blandit mollis enim. Donec
                  vel elit hendrerit, congue metus nec, sagittis nibh. Maecenas
                  non tincidunt sapien, ac ullamcorper nulla. Pellentesque
                  egestas cursus neque quis cursus. Aenean non rhoncus turpis.
                  Integer nec mi consequat, tempor nisl sit amet, interdum
                  lectus. Vivamus consequat sapien quis mi sagittis congue. Sed
                  mollis ut risus a faucibus.
                </Text.P>
              </MobilePadding>
            </Grid.Col>
            <Grid.Col
              cols={4}
              offset={1}
              colsAtTabletLandscape={12}
              offsetAtTabletLandscape={0}
            >
              <MobilePadding>
                <Text.P style={{textAlign: 'left'}}>
                  Aenean pharetra convallis nisl, vel rhoncus lectus tempus a.
                  Cras lectus nisl, lobortis eget ipsum quis, mattis
                  sollicitudin lectus. Duis auctor ligula leo. Aliquam finibus
                  sed est nec ornare. Duis tincidunt nisi non facilisis lacinia.
                  Nam fermentum, enim non placerat euismod, magna massa commodo
                  dui, in convallis ipsum diam lobortis velit. Cras volutpat
                  facilisis felis at volutpat.
                </Text.P>
              </MobilePadding>
            </Grid.Col>
          </Grid>

          <BankContainer>
            <PositionObserver
              id="piggyBankObserver"
              instersection-ratios="1"
              on="
                scroll:piggyBankAnim.seekTo(percent=event.percent),
                bill1Anim.seekTo(percent=event.percent),
                bill2Anim.seekTo(percent=event.percent),
                coin1Anim.seekTo(percent=event.percent),
                bill3Anim.seekTo(percent=event.percent),
                coin2Anim.seekTo(percent=event.percent)
              "
            />
            <BankImage
              id="piggyBank"
              layout="fixed"
              width="443"
              height="458"
              src="/static/spending/piggy-bank@2x.png"
            />
            <ParallaxAnimation
              id="piggyBankAnim"
              selector="#piggyBank"
              transform="translateY(-50%)"
            />

            <Bill1 id="bill1">
              <Bill size={443} angle={96} />
              <ParallaxAnimation
                id="bill1Anim"
                selector="#bill1"
                direction="reverse"
                transform="translateY(-100%)"
              />
            </Bill1>

            <Bill2 id="bill2">
              <Bill size={215} angle={-120} />
              <ParallaxAnimation
                id="bill2Anim"
                selector="#bill2"
                direction="reverse"
                transform="translateY(-200%)"
              />
            </Bill2>

            <Bill3 id="bill3">
              <Bill size={320} angle={125} />
              <ParallaxAnimation
                id="bill3Anim"
                selector="#bill3"
                transform="translateY(100%) rotate(40deg)"
              />
            </Bill3>

            <div
              id="coin1"
              style={{
                position: 'absolute',
                top: '27%',
                left: '19%',
                zIndex: '1',
              }}
            >
              <Coin size={119} angle={-12} />
              <ParallaxAnimation
                id="coin1Anim"
                selector="#coin1"
                transform="translateY(500px)"
              />
            </div>
            <div
              id="coin2"
              style={{
                position: 'absolute',
                top: 100,
                left: '58%',
                zIndex: 5,
              }}
            >
              <Coin size={125} angle={-143} />
              <ParallaxAnimation
                id="coin2Anim"
                selector="#coin2"
                transform="translateY(1000px)"
              />
            </div>

            <div
              id="coin3"
              style={{
                position: 'absolute',
                top: '27%',
                left: '56%',
                zIndex: '2',
              }}
            >
              <Coin size={125} angle={0} />
            </div>

            <div
              id="coin5"
              style={{
                position: 'absolute',
                top: '54%',
                left: '60%',
                zIndex: '1',
              }}
            >
              <Coin size={125} angle={34} />
            </div>

            <div
              id="coin6"
              style={{
                position: 'absolute',
                top: '92%',
                left: '54%',
                zIndex: '1',
              }}
            >
              <Coin size={125} angle={10} />
            </div>
          </BankContainer>
        </Container>
      </SpendingSection>
    );
  }
}

export default Spending;
