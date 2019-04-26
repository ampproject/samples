import * as React from 'react';
import styled from 'styled-components';

import {device} from '/util/device';
import Container from '/component/base/Container';
import Grid from '/component/base/Grid';
import Text from '/component/base/Text';
import MobilePadding from '/component/base/MobilePadding';
import Confetti, {presets} from '/component/base/Confetti';
import WorkClock from './WorkClock';
import WorkAnimation from './WorkAnimation';

const WorkSection = styled.section`
  background: ${({theme}) => theme.colors.dandelion};
  color: ${({theme}) => theme.colors.black};
  padding-bottom: 400px;
`;
const WorkGrid = styled(Grid)`
  padding-top: 225px;
  ${device.below.tabletLandscape`padding-top: 30px;`};
`;
const ImageCol = styled(Grid.Col)`
  ${device.below.tabletLandscape`text-align: center;`};
`;

class Work extends React.Component {
  render() {
    return (
      <WorkSection>
        <Container>
          <WorkGrid>
            <Grid.Col
              cols={2}
              offset={2}
              colsAtTabletLandscape={12}
              offsetAtTabletLandscape={0}
              style={{textAlign: 'center'}}
            >
              <WorkClock />
            </Grid.Col>
            <Grid.Col
              cols={4}
              offset={1}
              colsAtTabletLandscape={12}
              offsetAtTabletLandscape={0}
              style={{paddingTop: '75px'}}
            >
              <MobilePadding>
                <Text.P>
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
                <Text.P>
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
          </WorkGrid>

          <Grid style={{marginTop: '115px'}}>
            <Grid.Col
              cols={2}
              offset={3}
              colsAtTabletLandscape={4}
              offsetAtTabletLandscape={2}
              colsAtPhone={6}
              offsetAtPhone={1}
            >
              <Text.Accent color="flushOrange" style={{paddingTop: '80px'}}>
                71%
              </Text.Accent>
              <Text color="flushOrange">
                Expect and want to do an overseas assignment during their career
              </Text>
            </Grid.Col>
            <ImageCol cols={3} colsAtTabletLandscape={6} colsAtPhone={12}>
              <amp-img
                width="208"
                height="289"
                src="/static/work/person@2x.png"
                style={{zIndex: 2}}
              />
              <Confetti
                pieces={presets.basic}
                color="flushOrange"
                style={{position: 'absolute', top: 0, right: 100, zIndex: 1}}
              />
            </ImageCol>
          </Grid>
          <Grid style={{marginTop: '115px', paddingBottom: '415px'}}>
            <Grid.Col
              cols={4}
              offset={5}
              colsAtTabletLandscape={12}
              offsetAtTabletLandscape={0}
            >
              <MobilePadding>
                <Text.P>
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
          <WorkAnimation />
        </Container>
      </WorkSection>
    );
  }
}

export default Work;
