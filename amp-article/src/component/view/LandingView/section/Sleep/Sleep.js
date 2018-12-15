import * as React from 'react';
import styled from 'styled-components';

import Container from '/component/base/Container';
import Grid from '/component/base/Grid';
import Text from '/component/base/Text';
import SpacedContent from '/component/base/SpacedContent';
import MobilePadding from '/component/base/MobilePadding';
import SleepCarousel from './SleepCarousel';

const SleepSection = styled.section`
  background: ${({theme}) => theme.colors.mirage};
  color: ${({theme}) => theme.colors.dullLavender};
  position: relative;
`;
const Title = styled(Text.Title)`
  color: ${({theme}) => theme.colors.akaroa};
  text-align: center;
`;

class Sleep extends React.Component {
  render() {
    return (
      <SleepSection>
        <SpacedContent f={14} footer header>
          <Container>
            <Title>SLEEP</Title>
          </Container>
          <Container>
            <Grid>
              <Grid.Col
                offset={3}
                cols={6}
                offsetAtTabletLandscape={0}
                colsAtTabletLandscape={12}
              >
                <MobilePadding>
                  <Text.P style={{fontSize: '24px', textAlign: 'center'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi tortor justo, facilisis id lobortis ac, elementum et
                    sem. Nam quis turpis eget ipsum fermentum malesuada.
                    Praesent ante metus, dignissim ut ullamcorper vitae,
                    lobortis in enim. Sed nec dapibus dui, eget lobortis enim.
                    Suspendisse vehicula nunc ut ante consequat, at suscipit
                    sapien.
                  </Text.P>
                </MobilePadding>
              </Grid.Col>
            </Grid>
          </Container>
          <Container>
            <Grid>
              <Grid.Col
                offset={2}
                cols={8}
                offsetAtTabletLandscape={0}
                colsAtTabletLandscape={12}
              >
                <SleepCarousel />
              </Grid.Col>
            </Grid>
          </Container>
        </SpacedContent>
      </SleepSection>
    );
  }
}

export default Sleep;
