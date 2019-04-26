import * as React from 'react';
import styled from 'styled-components';
import {omit} from 'ramda';

import {device} from '/util/device';
import Container from '/component/base/Container';
import Grid from '/component/base/Grid';
import Text from '/component/base/Text';
import Window from '/component/base/Window';
import MobilePadding from '/component/base/MobilePadding';
import PositionObserver from '/component/amp/PositionObserver';
import Animation from '/component/amp/Animation';
import Confetti, {presets} from '/component/base/Confetti';

const EducationSection = styled.section`
  background: ${({theme}) => theme.colors.blueChalk};
  color: ${({theme}) => theme.colors.purpleHeart};
`;
const Intro = styled.div`
  position: relative;
  margin: 220px 0 160px 0;
  ${device.below.tabletLandscape`margin: 0;`};
`;
const StickyContainer = styled.div`
  height: 200vh;
`;

const StickyContent = styled.div`
  position: sticky;
  top: -30vh;
`;

const PerspectiveWrapper = styled.div`
  position: relative;
  perspective: 200px;
  perspective-origin: center bottom;
`;

const MainCircle = styled.div`
  background: ${({theme}) => theme.colors.rose};
  border-radius: 50%;
  width: 637px;
  height: 637px;
  position: absolute;
  top: -200px;
  left: 10%;
  opacity: 0;
  overflow: hidden;
  ${device.below.tabletLandscape`
    position: relative;
    top: auto
    left: 50%;
    transform: translateX(-50%);

    display: block;
  `}
`;
const Title = styled(Text.Title)`
  padding-left: 47%;
  position: relative;
  z-index: 2;
  ${device.below.tabletLandscape`
    padding: 0 25px;
    top: -0.35em;
  `};
`;
const ContentGridCol = styled(Grid.Col)`
  text-align: justify;
  ${device.below.tabletLandscape`text-align: left;`};
`;
const MobileFloatRight = styled.div`
  ${device.below.tabletLandscape`
    float:right;
    margin-right: 30%;
    max-width: 220px;
  `};
  ${device.below.tabletPortrait`margin-right: 25px;`};
`;
const ContentWrapper = styled(MobilePadding)`
  padding-top: 100px;
  ${device.below.tabletLandscape`padding-top: 0`};
`;
const GridBackground = styled.div`
  background: url('/static/education-bg-grid.svg');
`;
const Windows = styled.div`
  margin: 300px 0;
  height: 350px;
  position: relative;
  ${device.below.tabletLandscape`height: 500px;`}
`;
const WindowHover = styled((props) => {
  return <Window {...omit(['z'], props)} />;
})`
  z-index: ${({z}) => (z ? z : '0')};
  transition: transform 0.2s ease-out;
  ${device.below.tabletLandscape`zoom: 0.7;`}

  &:hover {
    z-index: 10;
    transform: translateY(-10px);
  }
`;
const WindowHover1 = styled(WindowHover)`
  position: absolute;
  top: 100px;
  left: 12.5%;
  ${device.below.tabletLandscape`
    top: 100px;
    left: 2%;
  `};
`;
const WindowHover2 = styled(WindowHover)`
  position: absolute;
  top: -30px;
  left: 25%;
  ${device.below.tabletLandscape`
    top: -410px;
    left: -15%;
  `};
`;
const WindowHover3 = styled(WindowHover)`
  position: absolute;
  top: 70px;
  left: 40%;
  ${device.below.tabletLandscape`
    top: -215px;
    left: 40%;
  `};
`;
const WindowHover4 = styled(WindowHover)`
  position: absolute;
  top: -50%;
  right: -44%;
  text-align: center;
  z-index: 3;
  ${device.below.tabletLandscape`
    top: -480px;
    right: 8%;
  `};
`;
const VideoWindowWrapper = styled.div`
  height: 700px;
  margin-top: 200px;
  position: relative;
`;
const VideoWindow1 = styled(Window)`
  position: absolute;
  left: 26%;
  z-index: 2;
  ${device.below.tabletLandscape`left: 12%;`};
  ${device.below.tabletPortrait`left: 25px;`};
`;
const VideoWindow2 = styled(Window)`
  position: absolute;
  left: 40%;
  top: -30px;
  z-index: 1;
  ${device.below.tabletLandscape`left: 25%;`};
`;
const Break = styled.hr`
  border: 1px solid #979797;
  border-width: 1px 0 0 0;
  opacity: 0.1;
  margin: 25px 0;
`;

const CircleImage = styled(({className, ...rest}) => (
  <amp-img class={className} {...rest} />
))`
  &[layout='fixed'][width][height] {
    position: absolute;
  }
`;

const ContentStuff = styled.div`
  margin-top: 100px;
`;

class Education extends React.Component {
  render() {
    return (
      <EducationSection>
        <div>
          <StickyContainer>
            <StickyContent>
              <Container>
                <PerspectiveWrapper>
                  <Confetti
                    id="eduConfetti"
                    pieces={presets.largeMultiColor}
                    style={{margin: '10px auto 30px'}}
                  />
                  <Intro>
                    <MainCircle id="eduCircle">
                      <CircleImage
                        id="eduImg1"
                        src="/static/education/1@2x.png"
                        layout="fixed"
                        width="209"
                        height="189"
                        style={{bottom: '12%', left: '17%'}}
                      />
                      <CircleImage
                        id="eduImg3"
                        src="/static/education/3@2x.png"
                        layout="fixed"
                        width="125"
                        height="213"
                        style={{bottom: '14%', left: '54%'}}
                      />
                      <CircleImage
                        id="eduImg2"
                        src="/static/education/2@2x.png"
                        layout="fixed"
                        width="257"
                        height="194"
                        style={{bottom: '11%', left: '30%'}}
                      />
                      <CircleImage
                        id="eduImg4"
                        src="/static/education/4@2x.png"
                        layout="fixed"
                        width="248"
                        height="206"
                        style={{bottom: 0, left: 0}}
                      />
                      <CircleImage
                        id="eduImg6"
                        src="/static/education/6@2x.png"
                        layout="fixed"
                        width="172"
                        height="184"
                        style={{bottom: 0, left: '60%'}}
                      />
                      <CircleImage
                        id="eduImg5"
                        src="/static/education/5@2x.png"
                        layout="fixed"
                        width="232"
                        height="170"
                        style={{bottom: 0, left: '33%'}}
                      />
                    </MainCircle>
                    <Title id="eduTitle">
                      EDU-
                      <br />
                      CATION
                    </Title>
                  </Intro>
                </PerspectiveWrapper>
              </Container>
            </StickyContent>
          </StickyContainer>
          <PositionObserver
            id="eduIntroObs"
            instersection-ratios="0.5"
            on="scroll:eduIntroAnim.seekTo(percent=event.percent)"
          />
          <Animation
            id="eduIntroAnim"
            animation={{
              duration: '1',
              fill: 'both',
              direction: 'normal',
              animations: [
                {
                  selector: '#eduCircle',
                  switch: [
                    {
                      media: '(max-width: 599px)',
                      keyframes: [
                        {
                          transform: 'translate3d(-60%, 45%, 190px)',
                          opacity: 0,
                          offset: 0,
                        },
                        {
                          transform: 'translate3d(-60%, 45%, 190px)',
                          opacity: 0,
                          offset: 0.01,
                        },
                        {
                          transform: 'translate3d(-60%, 45%, 190px)',
                          opacity: 1,
                          offset: 0.011,
                        },
                        {
                          transform: 'translate3d(-60%, 45%, 190px)',
                          opacity: 1,
                          offset: 0.3,
                        },
                        {
                          transform: 'translate3d(0, 0, 0px)',
                          opacity: 1,
                          offset: 0.5,
                        },
                        {
                          transform: 'translate3d(0, 0, 0px)',
                          opacity: 1,
                          offset: 1,
                        },
                      ],
                    },
                    {
                      media: '(min-width: 600px)',
                      keyframes: [
                        {
                          transform: 'translate3d(40%, 35%, 190px)',
                          opacity: 0,
                          offset: 0,
                        },
                        {
                          transform: 'translate3d(40%, 35%, 190px)',
                          opacity: 1,
                          offset: 0.00001,
                        },
                        {
                          transform: 'translate3d(40%, 35%, 190px)',
                          opacity: 1,
                          offset: 0.3,
                        },
                        {
                          transform: 'translate3d(0, 0, 0px)',
                          opacity: 1,
                          offset: 0.5,
                        },
                        {
                          transform: 'translate3d(0, 0, 0px)',
                          opacity: 1,
                          offset: 1,
                        },
                      ],
                    },
                  ],
                },
                {
                  selector: '#eduConfetti',
                  keyframes: [
                    {
                      opacity: 0,
                      offset: 0,
                      transform: 'translateY(-200px)',
                    },
                    {
                      opacity: 0,
                      offset: 0.45,
                      transform: 'translateY(-200px)',
                    },
                    {
                      opacity: 1,
                      offset: 0.55,
                      transform: 'translateY(0px)',
                    },
                    {
                      opacity: 1,
                      offset: 1,
                      transform: 'translateY(0px)',
                    },
                  ],
                },
                {
                  selector: '#eduTitle',
                  keyframes: [
                    {
                      opacity: 0,
                      offset: 0,
                      transform: 'translateX(200px)',
                    },
                    {
                      opacity: 0,
                      offset: 0.5,
                      transform: 'translateX(200px)',
                    },
                    {
                      opacity: 1,
                      offset: 0.6,
                      transform: 'translateX(0px)',
                    },
                    {
                      opacity: 1,
                      offset: 1,
                      transform: 'translateX(0px)',
                    },
                  ],
                },
                {
                  selector: '#eduImg1',
                  keyframes: [
                    {
                      opacity: 0,
                      offset: 0,
                      transform: 'translateY(200px)',
                    },
                    {
                      opacity: 0,
                      offset: 0.63,
                      transform: 'translateY(200px)',
                    },
                    {
                      opacity: 1,
                      offset: 0.71,
                      transform: 'translateY(0px)',
                    },
                    {
                      opacity: 1,
                      offset: 1,
                      transform: 'translateY(0px)',
                    },
                  ],
                },
                {
                  selector: '#eduImg2',
                  keyframes: [
                    {
                      opacity: 0,
                      offset: 0,
                      transform: 'translateY(200px)',
                    },
                    {
                      opacity: 0,
                      offset: 0.56,
                      transform: 'translateY(200px)',
                    },
                    {
                      opacity: 1,
                      offset: 0.66,
                      transform: 'translateY(0px)',
                    },
                    {
                      opacity: 1,
                      offset: 1,
                      transform: 'translateY(0px)',
                    },
                  ],
                },
                {
                  selector: '#eduImg3',
                  keyframes: [
                    {
                      opacity: 0,
                      offset: 0,
                      transform: 'translateY(200px)',
                    },
                    {
                      opacity: 0,
                      offset: 0.64,
                      transform: 'translateY(200px)',
                    },
                    {
                      opacity: 1,
                      offset: 0.72,
                      transform: 'translateY(0px)',
                    },
                    {
                      opacity: 1,
                      offset: 1,
                      transform: 'translateY(0px)',
                    },
                  ],
                },
                {
                  selector: '#eduImg4',
                  keyframes: [
                    {
                      opacity: 0,
                      offset: 0,
                      transform: 'translateY(200px)',
                    },
                    {
                      opacity: 0,
                      offset: 0.61,
                      transform: 'translateY(200px)',
                    },
                    {
                      opacity: 1,
                      offset: 0.71,
                      transform: 'translateY(0px)',
                    },
                    {
                      opacity: 1,
                      offset: 1,
                      transform: 'translateY(0px)',
                    },
                  ],
                },
                {
                  selector: '#eduImg5',
                  keyframes: [
                    {
                      opacity: 0,
                      offset: 0,
                      transform: 'translateY(200px)',
                    },
                    {
                      opacity: 0,
                      offset: 0.59,
                      transform: 'translateY(200px)',
                    },
                    {
                      opacity: 1,
                      offset: 0.65,
                      transform: 'translateY(0px)',
                    },
                    {
                      opacity: 1,
                      offset: 1,
                      transform: 'translateY(0px)',
                    },
                  ],
                },
                {
                  selector: '#eduImg6',
                  keyframes: [
                    {
                      opacity: 0,
                      offset: 0,
                      transform: 'translateY(200px)',
                    },
                    {
                      opacity: 0,
                      offset: 0.58,
                      transform: 'translateY(200px)',
                    },
                    {
                      opacity: 1,
                      offset: 0.68,
                      transform: 'translateY(0px)',
                    },
                    {
                      opacity: 1,
                      offset: 1,
                      transform: 'translateY(0px)',
                    },
                  ],
                },
              ],
            }}
          />
        </div>
        <ContentStuff>
          <Container>
            <Grid>
              <ContentGridCol
                cols={4}
                offset={2}
                colsAtTabletLandscape={12}
                offsetAtTabletLandscape={0}
              >
                <ContentWrapper>
                  <Text.P>
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
                    neque quis cursus. Aenean non rhoncus turpis. Integer nec mi
                    consequat, tempor nisl sit amet, interdum lectus. Vivamus
                    consequat sapien quis mi sagittis congue. Sed mollis ut
                    risus a faucibus.
                  </Text.P>
                  <Text.P>
                    Aenean pharetra convallis nisl, vel rhoncus lectus tempus a.
                    Cras lectus nisl, lobortis eget ipsum quis, mattis
                    sollicitudin lectus. Duis auctor ligula leo. Aliquam finibus
                    sed est nec ornare. Duis tincidunt nisi non facilisis
                    lacinia. Nam fermentum, enim non placerat euismod, magna
                    massa commodo dui, in convallis ipsum diam lobortis velit.
                    Cras volutpat facilisis felis at volutpat.
                  </Text.P>
                </ContentWrapper>
              </ContentGridCol>
              <Grid.Col
                cols={2}
                offset={1}
                colsAtTabletLandscape={12}
                offsetAtTabletLandscape={0}
              >
                <MobilePadding
                  style={{marginBottom: '120px', maxWidth: '220px'}}
                >
                  <Text.Accent color="rose">39%</Text.Accent>
                  <Text color="rose">
                    % of those aged between 21 and 36 who have completed at
                    least a bachelor's degree
                  </Text>
                </MobilePadding>
                <MobileFloatRight>
                  <amp-img
                    width="218"
                    height="285"
                    layout="fixed"
                    src="/static/education-fem-sitting.svg"
                    style={{marginBottom: '20px'}}
                  />
                  <Confetti
                    pieces={presets.basic}
                    color="rose"
                    style={{transform: 'translateY(8%) rotate(24deg)'}}
                  />
                </MobileFloatRight>
              </Grid.Col>
            </Grid>
            <Grid style={{marginTop: '60px'}}>
              <Grid.Col
                cols={7}
                offset={3}
                colsAtTabletLandscape={12}
                offsetAtTabletLandscape={0}
              >
                <MobilePadding>
                  <Text.Accent color="rose">
                    Women are 4x more likely to have a bachelor’s degree.
                  </Text.Accent>
                </MobilePadding>
              </Grid.Col>
            </Grid>
            <Grid style={{marginTop: '75px'}}>
              <Grid.Col
                cols={2}
                offset={2}
                textAlign="right"
                hideFor={device.below.tabletLandscape}
              >
                <Confetti
                  pieces={presets.basic}
                  color="rose"
                  style={{transform: 'translateY(50%) rotate(45deg)'}}
                />
              </Grid.Col>
              <ContentGridCol cols={4} colsAtTabletLandscape={12}>
                <MobilePadding>
                  <Text.P style={{paddingTop: '35px'}}>
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
                    neque quis cursus. Aenean non rhoncus turpis. Integer nec mi
                    consequat, tempor nisl sit amet, interdum lectus. Vivamus
                    consequat sapien quis mi sagittis congue. Sed mollis ut
                    risus a faucibus.
                  </Text.P>
                  <Text.P>
                    Aenean pharetra convallis nisl, vel rhoncus lectus tempus a.
                    Cras lectus nisl, lobortis eget ipsum quis, mattis
                    sollicitudin lectus. Duis auctor ligula leo. Aliquam finibus
                    sed est nec ornare. Duis tincidunt nisi non facilisis
                    lacinia. Nam fermentum, enim non placerat euismod, magna
                    massa commodo dui, in convallis ipsum diam lobortis velit.
                    Cras volutpat facilisis felis at volutpat.
                  </Text.P>
                </MobilePadding>
              </ContentGridCol>
            </Grid>
          </Container>
        </ContentStuff>
        <GridBackground>
          <Container>
            <Windows>
              <WindowHover1
                z="3"
                width="565px"
                title="Become a developer"
                bgColor="purpleHeart"
                textColor="white"
              >
                <pre style={{lineHeight: '1.2rem'}}>{`
class ShoppingList extends React.Component {
render() {
  return (
    <div className="shopping-list">
      <h1>Shopping List for {this.props.name}</h1>
      <ul>
        <li>Instagram</li>
        <li>WhatsApp</li>
        <li>Oculus</li>
      </ul>
    </div>
  );
}
}

// Example usage: <ShoppingList name="Mark" />
                `}</pre>
              </WindowHover1>
              <WindowHover2 z="2">
                <amp-img
                  layout="fixed"
                  width="494"
                  height="316"
                  src="/static/education-window-img1.svg"
                />
              </WindowHover2>
              <WindowHover3 z="1">
                <amp-img
                  layout="fixed"
                  width="538"
                  height="204"
                  src="/static/education-window-img2.svg"
                  style={{margin: '90px 0 35px'}}
                />
              </WindowHover3>
            </Windows>

            <Grid>
              <Grid.Col
                offset={3}
                cols={6}
                colsAtTabletLandscape={12}
                offsetAtTabletLandscape={0}
              >
                <MobilePadding>
                  <Text.AccentSmall
                    color="rose"
                    style={{position: 'relative', zIndex: '11'}}
                  >
                    But millennials are turning to the internet in order to
                    learn new skills and change careers.
                  </Text.AccentSmall>
                </MobilePadding>

                <WindowHover4 bgColor="serenade" title="Online courses">
                  <Confetti
                    pieces={presets.basic}
                    color="rose"
                    style={{margin: '0 70px 30px'}}
                  />
                  <Text
                    family="Oswald"
                    size="16px"
                    color="webOrange"
                    weight="300"
                    height="24px"
                  >
                    Class 24
                  </Text>
                  <Text
                    color="webOrange"
                    size="33px"
                    height="42px"
                    weight="400"
                  >
                    Congratulations
                  </Text>
                  <Text
                    color="webOrange"
                    size="33px"
                    height="42px"
                    weight="400"
                    style={{marginBottom: '35px'}}
                  >
                    You've graduated
                  </Text>
                </WindowHover4>
              </Grid.Col>
            </Grid>

            <VideoWindowWrapper>
              <VideoWindow1 title="Learn AMP by Example" width="225px">
                <Text size="12px" height="14px" weight="400">
                  A hands-on introduction to Accelerated Mobile Pages (AMP)
                  focusing on code and live samples. Learn how to create AMP
                  pages and see examples for all AMP components.
                </Text>
                <amp-youtube
                  style={{marginTop: '25px'}}
                  width="480"
                  height="270"
                  layout="responsive"
                  data-videoid="lBTCB7yLs8Y"
                />
                <Break />
                <Text size="12px" height="14px" weight="bold">
                  Introduction
                </Text>
                <Text size="12px" height="14px" weight="400">
                  Get started with AMP and learn how to build your first AMP pa
                </Text>
              </VideoWindow1>
              <VideoWindow2 title="Get started with AMP" width="568px">
                <amp-youtube
                  style={{margin: '-30px -25px 15px'}}
                  width="480"
                  height="270"
                  layout="responsive"
                  data-videoid="lBTCB7yLs8Y"
                />
                <div style={{maxWidth: '315px'}}>
                  <Text
                    size="16px"
                    height="19px"
                    weight="400"
                    style={{marginBottom: '15px'}}
                  >
                    Course 3: Prepare your AMP page for discovery and
                    distribution
                  </Text>
                  <Text size="12px" height="14px" weight="400">
                    In some cases, you might want to have both a non-AMP and an
                    AMP version of the same page, for example, a news article.
                    Consider this: If Google Search finds the non-AMP version of
                    that page, how does it know there’s a "paired" AMP version
                    of it?
                  </Text>
                </div>
              </VideoWindow2>
            </VideoWindowWrapper>
          </Container>
        </GridBackground>
      </EducationSection>
    );
  }
}

export default Education;
