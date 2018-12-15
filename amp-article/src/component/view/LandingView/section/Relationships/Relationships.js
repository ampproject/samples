import * as React from 'react';
import styled from 'styled-components';

import {device} from '/util/device';
import AmpImage from '/component/amp/AmpImage';
import ParallaxAnimation from '/component/amp/ParallaxAnimation';
import PositionObserver from '/component/amp/PositionObserver';
import Container from '/component/base/Container';
import Grid from '/component/base/Grid';
import Text from '/component/base/Text';
import Confetti, {presets} from '/component/base/Confetti';
import DatingCard from '/component/base/DatingCard';
import SpacedContent from '/component/base/SpacedContent';
import PaddedContent from '/component/base/PaddedContent';
import MobilePadding from '/component/base/MobilePadding';
import SleepIntro from './SleepIntro';

const RelationshipsSection = styled.section`
  background: ${({theme}) => theme.colors.carnationPink};
  color: ${({theme}) => theme.colors.paprika};
  position: relative;
  z-index: 7;
  padding: 200px 0 0 0;
`;

const SleepBackground = styled.div`
  background: linear-gradient(180deg, #fc9ebe 0%, #20233f 100%);
  position: absolute;
  left: 0;
  right: 0;
  bottom: -300px;
  height: 800px;
  display: none;
`;
const TitleCap = styled.div`
  position: relative;
  left: -250px;
  bottom: -54px;
  z-index: 1;
  ${device.below.tabletLandscape`
    left: -150px;
    bottom: -47px;
  `}
  ${device.below.tabletPortrait`
    left: -150px;
    bottom: -32px;
  `}
`;
const Accent = styled(Text.Accent)`
  padding-top: 80px;

  ${device.below.tabletPortrait`
    font-size: 90px;
    padding-top: 0;
    margin-top: -40px;
  `}
`;
const CalloutImage = styled(AmpImage)`
  margin-top: 120px;
  margin: 120px auto 0 auto;
  ${device.below.tabletPortrait`
    margin-top: 240px;
  `}
`;

class Relationships extends React.Component {
  render() {
    return (
      <RelationshipsSection>
        <SleepBackground />
        <Container>
          <SpacedContent f={12} style={{position: 'relative', zIndex: '2'}}>
            <Grid>
              <Grid.Col
                cols={5}
                offset={2}
                colsAtTabletLandscape={7}
                offsetAtTabletLandscape={0}
                colsAtTabletPortrait={12}
                offsetAtTabletPortrait={0}
              >
                <MobilePadding>
                  <TitleCap>
                    <Confetti
                      pieces={presets.basic}
                      color="white"
                      style={{position: 'absolute', right: '30%', top: -56}}
                    />
                    <AmpImage
                      layout="responsive"
                      width="436"
                      height="185"
                      src="/static/relationships/woman-lying-down@2x.png"
                    />
                  </TitleCap>
                  <AmpImage
                    layout="responsive"
                    width="536"
                    height="522"
                    src="/static/relationships/main-title@2x.png"
                  />
                </MobilePadding>

                <MobilePadding>
                  <Grid
                    hideFor={device.above.phone}
                    style={{marginTop: '60px'}}
                  >
                    <Grid.Col cols={6} style={{zIndex: 2}}>
                      <SpacedContent f={6}>
                        <DatingCard
                          id="date-card-mobile-1"
                          layout="responsive"
                          flyoutDirection="left"
                          width="233"
                          height="278"
                          src="/static/relationships/card1@2x.png"
                        />
                        <div
                          style={{
                            position: 'relative',
                            width: '100%',
                            paddingTop: '100%',
                          }}
                        >
                          <DatingCard
                            id="date-card-mobile-2"
                            layout="intrinsic"
                            flyoutDirection="left"
                            width="405"
                            height="276"
                            src="/static/relationships/card9@2x.png"
                            style={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              width: '170%',
                            }}
                          />
                        </div>
                        <DatingCard
                          id="date-card-mobile-3"
                          layout="responsive"
                          flyoutDirection="left"
                          width="233"
                          height="278"
                          src="/static/relationships/card8@2x.png"
                        />
                        <DatingCard
                          id="date-card-mobile-4"
                          layout="responsive"
                          flyoutDirection="left"
                          width="233"
                          height="278"
                          src="/static/relationships/card10@2x.png"
                        />
                        <DatingCard
                          id="date-card-mobile-5"
                          layout="responsive"
                          flyoutDirection="left"
                          width="233"
                          height="278"
                          src="/static/relationships/card7@2x.png"
                        />
                      </SpacedContent>
                    </Grid.Col>
                    <Grid.Col cols={6} style={{zIndex: 2}}>
                      <SpacedContent f={6}>
                        <DatingCard
                          id="date-card-mobile-6"
                          layout="responsive"
                          flyoutDirection="right"
                          width="233"
                          height="278"
                          src="/static/relationships/card2@2x.png"
                          style={{marginTop: '100px'}}
                        />
                        <DatingCard
                          id="date-card-mobile-7"
                          layout="responsive"
                          flyoutDirection="right"
                          width="233"
                          height="278"
                          src="/static/relationships/card3@2x.png"
                        />
                        <DatingCard
                          id="date-card-mobile-8"
                          layout="responsive"
                          flyoutDirection="right"
                          width="233"
                          height="278"
                          src="/static/relationships/card4@2x.png"
                        />
                        <DatingCard
                          id="date-card-mobile-9"
                          layout="responsive"
                          flyoutDirection="right"
                          width="233"
                          height="278"
                          src="/static/relationships/card5@2x.png"
                        />
                        <DatingCard
                          id="date-card-mobile-10"
                          layout="responsive"
                          width="233"
                          height="278"
                          src="/static/relationships/card6@2x.png"
                        />
                      </SpacedContent>
                    </Grid.Col>
                    <Grid.Col cols={12} style={{zIndex: 1}}>
                      <Confetti
                        pieces={presets.basic}
                        color="white"
                        style={{margin: '-30% auto 0 auto'}}
                      />
                    </Grid.Col>
                  </Grid>
                </MobilePadding>

                <Grid
                  style={{marginTop: '150px'}}
                  hideFor={device.below.tabletPortrait}
                >
                  <Grid.Col cols={6}>
                    <div
                      style={{
                        width: '100%',
                        height: '276px',
                        position: 'relative',
                      }}
                    >
                      <DatingCard
                        id="date-card-10"
                        flyoutDirection="left"
                        width="405"
                        height="276"
                        src="/static/relationships/card9@2x.png"
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0%',
                          marginTop: '50%',
                        }}
                      />
                    </div>
                  </Grid.Col>
                  <Grid.Col cols={6} textAlign="right">
                    <SpacedContent f={6}>
                      <DatingCard
                        id="date-card-8"
                        flyoutDirection="left"
                        width="233"
                        height="278"
                        src="/static/relationships/card8@2x.png"
                      />
                      <DatingCard
                        id="date-card-9"
                        flyoutDirection="right"
                        width="233"
                        height="278"
                        src="/static/relationships/card10@2x.png"
                      />
                    </SpacedContent>
                  </Grid.Col>
                </Grid>

                <SpacedContent f={4}>
                  <MobilePadding style={{marginTop: '60px'}}>
                    <Text.P color="paprika">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi tortor justo, facilisis id lobortis ac, elementum et
                      sem. Nam quis turpis eget ipsum fermentum malesuada.
                      Praesent ante metus, dignissim ut ullamcorper vitae,
                      lobortis in enim. Sed nec dapibus dui, eget lobortis enim.
                      Suspendisse vehicula nunc ut ante consequat, at suscipit
                      sapien volutpat. Donec sit amet ante ut tellus vulputate
                      lobortis blandit mollis enim. Donec vel elit hendrerit,
                      congue metus nec, sagittis nibh. Maecenas non tincidunt
                      sapien, ac ullamcorper nulla. Pellentesque egestas cursus
                      neque quis cursus. Aenean non rhoncus turpis. Integer nec
                      mi consequat, tempor nisl sit amet, interdum lectus.
                      Vivamus consequat sapien quis mi sagittis congue. Sed
                      mollis ut risus a faucibus.
                    </Text.P>
                    <Text.P color="paprika">
                      Aenean pharetra convallis nisl, vel rhoncus lectus tempus
                      a. Cras lectus nisl, lobortis eget ipsum quis, mattis
                      sollicitudin lectus. Duis auctor ligula leo. Aliquam
                      finibus sed est nec ornare. Duis tincidunt nisi non
                      facilisis lacinia. Nam fermentum, enim non placerat
                      euismod, magna massa commodo dui, in convallis ipsum diam
                      lobortis velit. Cras volutpat facilisis felis at volutpat.
                    </Text.P>
                  </MobilePadding>
                </SpacedContent>
              </Grid.Col>
              <Grid.Col cols={2} offset={1} hideFor={device.below.phone}>
                <SpacedContent f={6}>
                  <DatingCard
                    id="date-card-1"
                    flyoutDirection="left"
                    width="233"
                    height="278"
                    src="/static/relationships/card1@2x.png"
                    style={{marginTop: '100px'}}
                  />
                  <DatingCard
                    id="date-card-2"
                    flyoutDirection="right"
                    width="233"
                    height="278"
                    src="/static/relationships/card2@2x.png"
                  />
                  <DatingCard
                    id="date-card-3"
                    flyoutDirection="right"
                    width="233"
                    height="278"
                    src="/static/relationships/card3@2x.png"
                  />
                  <DatingCard
                    id="date-card-4"
                    flyoutDirection="right"
                    width="233"
                    height="278"
                    src="/static/relationships/card4@2x.png"
                  />
                  <DatingCard
                    id="date-card-5"
                    flyoutDirection="left"
                    width="233"
                    height="278"
                    src="/static/relationships/card5@2x.png"
                  />
                  <DatingCard
                    id="date-card-6"
                    flyoutDirection="right"
                    width="233"
                    height="278"
                    src="/static/relationships/card7@2x.png"
                  />
                  <DatingCard
                    id="date-card-7"
                    width="233"
                    height="278"
                    src="/static/relationships/card6@2x.png"
                  />
                  <Confetti
                    pieces={presets.basic}
                    color="white"
                    style={{transform: 'rotate(45deg)'}}
                  />
                </SpacedContent>
              </Grid.Col>
            </Grid>
            <Grid style={{marginTop: '-150px'}}>
              <Grid.Col
                cols={4}
                offset={1.5}
                colsAtTabletLandscape={12}
                offsetAtTabletLandscape={0}
              >
                <PaddedContent f={2}>
                  <PositionObserver
                    id="relCallout2Observer"
                    instersection-ratios="1"
                    on="scroll:relCallout2ParallaxAnim.seekTo(percent=event.percent)"
                  />
                  <ParallaxAnimation
                    id="relCallout2ParallaxAnim"
                    selector="#relationship-callout2"
                    transform="translateY(-60%)"
                  />
                  <div
                    id="relationship-callout2"
                    style={{position: 'relative', textAlign: 'center'}}
                  >
                    <CalloutImage
                      layout="intrinsic"
                      width="385"
                      height="385"
                      src="/static/relationships/callout@2x.png"
                    />
                    <Confetti
                      color="white"
                      pieces={presets.small}
                      style={{
                        position: 'absolute',
                        bottom: '200px',
                        left: '45%',
                        transform: 'translateX(-50%)',
                      }}
                    />
                  </div>
                </PaddedContent>
              </Grid.Col>
              <Grid.Col
                cols={4}
                offset={1}
                colsAtTabletPortrait={12}
                offsetAtTabletPortrait={0}
              >
                <MobilePadding>
                  <div style={{maxWidth: '320px'}}>
                    <Accent color="white">21%</Accent>
                    <Text style={{marginTop: '15px'}}>
                      millennials who are married or in relationships met their
                      partner online, according to Avvo.
                    </Text>
                  </div>
                  <div style={{margin: '150px 0 0 0'}}>
                    <Text.P color="paprika">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi tortor justo, facilisis id lobortis ac, elementum et
                      sem. Nam quis turpis eget ipsum fermentum malesuada.
                      Praesent ante metus, dignissim ut ullamcorper vitae,
                      lobortis in enim. Sed nec dapibus dui, eget lobortis enim.
                      Suspendisse vehicula nunc ut ante consequat, at suscipit
                      sapien volutpat. Donec sit amet ante ut tellus vulputate
                      lobortis blandit mollis enim. Donec vel elit hendrerit,
                      congue metus nec, sagittis nibh. Maecenas non tincidunt
                      sapien, ac ullamcorper nulla. Pellentesque egestas cursus
                      neque quis cursus. Aenean non rhoncus turpis. Integer nec
                      mi consequat, tempor nisl sit amet, interdum lectus.
                      Vivamus consequat sapien quis mi sagittis congue. Sed
                      mollis ut risus a faucibus.
                    </Text.P>
                  </div>
                </MobilePadding>
              </Grid.Col>
            </Grid>
          </SpacedContent>
        </Container>

        <SleepIntro />
      </RelationshipsSection>
    );
  }
}

export default Relationships;
