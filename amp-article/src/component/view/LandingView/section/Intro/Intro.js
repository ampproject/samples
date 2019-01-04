import * as React from 'react';
import styled from 'styled-components';

import {device} from '/util/device';
import Container from '/component/base/Container';
import Hidable from '/component/base/Hidable';
import Animation from '/component/amp/Animation';
import PositionObserver from '/component/amp/PositionObserver';
import Text from '/component/base/Text';
import Shape from '/component/base/Shape';
import Hero from './Hero';
import Graph from './Graph';
import Confetti, {presets} from '/component/base/Confetti';

const IntroSection = styled.section`
  color: #fff;
  background: #000 url('/static/intro-bg-grid.svg');
  background-position: center 920px;
`;
const Author = styled.div`
  text-align: center;
  opacity: 0.7;
  margin-bottom: 40px;
`;
const CalloutContainer = styled(Container)`
  margin-top: 500px;
  ${device.below.tabletLandscape`margin-top: 190px;`};
`;
const Callout = styled.div`
  text-align: center;
  font-size: 24px;
  max-width: 620px;
  margin: 0 auto;
  padding: 0 25px;
  line-height: 40px;
  ${device.below.tabletLandscape`text-align: left;`};
`;
const RectAnim = styled(({className, ...rest}) => (
  <amp-img layout="fixed" class={className} {...rest} />
))`
  position: absolute;
`;
const Definition = styled.div`
  color: ${({theme}) => theme.colors.aquamarine};
  font-weight: 300;
  margin: 420px 5% 0 14%;
  position: relative;
  ${device.below.tabletLandscape`
    margin: 420px 25px 0;

  `};
`;
const DefBig = styled(Text)`
  ${device.below.tabletLandscape`font-size: 80px;`};
`;
const DefSmall = styled(Text)`
  margin-top: 50px;
  ${device.below.tabletLandscape`margin-top: 20px;`};
`;
const Content = styled.div`
  max-width: 500px;
  padding: 0 25px;
  margin: 0 auto;
  font-size: 18px;
  line-height: 32px;
  text-align: justify;
  font-weight: 300;

  ${device.below.tabletLandscape`
    margin-bottom: 250px;
    text-align: left;
  `};

  & p {
    margin-bottom: 2em;
  }
`;

const UltimateVideo = styled(({className, ...rest}) => (
  <amp-video
    poster="/static/intro/poster.png"
    loop="loop"
    class={className}
    {...rest}
  />
))`
  flex: auto;
  margin: 0 -100px;
  > video[playsinline][class] {
    position: static;
    object-fit: cover;
    z-index: -1000;
  }
`;

const UltimateVideoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.5;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  pointer-events: none;
  overflow: hidden;
`;

class Intro extends React.Component {
  render() {
    return (
      <IntroSection>
        <UltimateVideoContainer>
          <UltimateVideo
            autoplay=""
            id="bgVid"
            layout="flex-item"
            width="100vw"
            height="100vh"
          >
            <source src="/static/background.mp4" type="video/mp4" />
            <div fallback="">
              <p>This browser does not support the video element.</p>
            </div>
          </UltimateVideo>
        </UltimateVideoContainer>
        <Container>
          <Author>An article by the AMP team</Author>
          <Hero />
          <CalloutContainer>
            <Callout id="calloutFadeOut">
              <PositionObserver
                id="testElemObserver"
                instersection-ratios="0.5"
                on="scroll:calloutAnim.seekTo(percent=event.percent)"
              />
              <Animation
                id="calloutAnim"
                animation={{
                  duration: '1',
                  fill: 'both',
                  direction: 'normal',
                  animations: [
                    {
                      selector: '#calloutFadeOut',
                      keyframes: [
                        {
                          opacity: 0,
                          transform: 'translate(0, 0)',
                          offset: 0,
                        },
                        {
                          opacity: 1,
                          transform: 'translate(0, 180px)',
                          offset: 1,
                        },
                      ],
                    },
                  ],
                }}
              />
              The generation that’s criticized in the media daily. But this
              generation are changing the status quo that previous generations
              swore by.
            </Callout>
          </CalloutContainer>
          <div style={{position: 'relative'}}>
            <div
              style={{
                position: 'absolute',
                right: -16,
                top: '15vh',
                width: 355,
                height: 33,
                overflow: 'hidden',
              }}
            >
              <RectAnim
                src="/static/rectangle-anim1.svg"
                width="355"
                height="33"
                style={{right: '-100px', top: 0}}
              />
            </div>
          </div>
          <Definition>
            <Text size="22px" height="25px">
              Definition
            </Text>
            <DefBig size="120px">
              25-35
              <br />
              yrs old
            </DefBig>
            <DefSmall height="19px">
              Anyone born between
              <br />
              1980 and 1994
            </DefSmall>
            <Confetti
              color="white"
              pieces={presets.basic}
              style={{position: 'absolute', left: 320, top: -100}}
            />
          </Definition>
        </Container>
        <Container style={{marginTop: '130px', position: 'relative'}}>
          <Content>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              tortor justo, facilisis id lobortis ac, elementum et sem. Nam quis
              turpis eget ipsum fermentum malesuada. Praesent ante metus,
              dignissim ut ullamcorper vitae, lobortis in enim. Sed nec dapibus
              dui, eget lobortis enim. Suspendisse vehicula nunc ut ante
              consequat, at suscipit sapien volutpat. Donec sit amet ante ut
              tellus vulputate lobortis blandit mollis enim. Donec vel elit
              hendrerit, congue metus nec, sagittis nibh. Maecenas non tincidunt
              sapien, ac ullamcorper nulla. Pellentesque egestas cursus neque
              quis cursus. Aenean non rhoncus turpis. Integer nec mi consequat,
              tempor nisl sit amet, interdum lectus. Vivamus consequat sapien
              quis mi sagittis congue. Sed mollis ut risus a faucibus.
            </p>
            <p>
              Aenean pharetra convallis nisl, vel rhoncus lectus tempus a. Cras
              lectus nisl, lobortis eget ipsum quis, mattis sollicitudin lectus.
              Duis auctor ligula leo. Aliquam finibus sed est nec ornare. Duis
              tincidunt nisi non facilisis lacinia. Nam fermentum, enim non
              placerat euismod, magna massa commodo dui, in convallis ipsum diam
              lobortis velit. Cras volutpat facilisis felis at volutpat.
            </p>
          </Content>
          <Hidable hideFor={device.below.tabletLandscape}>
            <Confetti
              pieces={[
                {
                  type: 'square',
                  size: 26,
                  left: 0,
                  top: 0,
                  thickness: 1,
                  color: 'aquamarine',
                  angle: 45,
                  rotate: 23,
                },
              ]}
              style={{position: 'absolute', top: '-150px', right: '30%'}}
            />
            <Confetti
              pieces={[
                {
                  type: 'circle',
                  size: 26,
                  left: 0,
                  top: 0,
                  thickness: 1,
                  color: 'flushOrange',
                  angle: 90,
                },
              ]}
              style={{position: 'absolute', top: '40%', right: '20%'}}
            />
            <Confetti
              pieces={[
                {
                  type: 'circle',
                  size: 9,
                  left: 0,
                  top: 0,
                  fill: true,
                  color: 'electricViolet',
                  angle: -45,
                },
              ]}
              style={{position: 'absolute', bottom: '20%', left: '27%'}}
            />
            <RectAnim
              src="/static/rectangle-anim2.svg"
              width="361"
              height="21"
              style={{left: '0px', top: '12vh'}}
            />
            <RectAnim
              src="/static/rectangle-anim3.svg"
              width="269"
              height="22"
              style={{right: '0px', top: '45vh'}}
            />
          </Hidable>
          <Hidable
            hideFor={device.above.tabletLandscape}
            style={{position: 'relative'}}
          >
            <RectAnim
              src="/static/rectangle-anim3.svg"
              width="269"
              height="22"
              style={{right: '0px', bottom: '40px'}}
            />
            <Shape.Circle
              color="flushOrange"
              size="26px"
              style={{position: 'absolute', bottom: '150px', left: '44%'}}
            />
          </Hidable>
        </Container>
        <Graph />
      </IntroSection>
    );
  }
}

export default Intro;
