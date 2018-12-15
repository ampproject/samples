import * as React from 'react';
import styled from 'styled-components';

import {device} from '/util/device';
import FitText from '/component/amp/FitText';
import PositionObserver from '/component/amp/PositionObserver';
import Animation from '/component/amp/Animation';

import Hidable from '/component/base/Hidable';
import Container from '/component/base/Container';

const StickyContainer = styled.div`
  height: 180vh;
  perspective: 200px;
`;

const yearStart = 1880; // left-most year edge
const yearEnd = 2040; // right-most year edge

// Determine edge position in %
const calcLeft = (year) => ((year - yearStart) / (yearEnd - yearStart)) * 100;
const calcWidth = (start, end) => ((end - start) / (yearEnd - yearStart)) * 100;

const StickyWrapper = styled.div`
  position: sticky;
  top: calc(100vh - 40%);
`;

const GraphContainer = styled.div`
  perspective: 200px;
  perspective-origin: 65% center;
  margin-top: 140px;
  position: relative;
  min-width: 640px;
  transform: translateX(-50%);
  left: 50%;
  position: relative;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 400;

  & > div {
    width: 100%;
    flex-grow: 2;
  }

  & > div:first-child,
  & > div:last-child {
    flex-grow: 1;
    width: 50%;
  }
`;
const Grid = styled.div`
  position: relative;
  height: 88vh;
  ${device.below.tabletLandscape`height: 330px;`};
`;
const Columns = styled.div`
  display: flex;
  height: 100%;
`;
const Col = styled(Hidable)`
  width: 100%;
  position: relative;
  border-right: 1px solid rgba(216, 216, 216, 0.18);

  &:last-child {
    border-right: 0px none;
  }
`;
const YearHeader = styled(Hidable)`
  font-size: 16px;
  font-weight: 400;
  opacity: 0;
`;
const Data = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const DataSilent = styled.div`
  background: #444;
  position: absolute;
  bottom: 0;
  height: calc(100% - 2rem);
  left: ${calcLeft(1925)}%;
  width: ${calcWidth(1925, 1945)}%;
  padding: 40px 12px;
`;
const DataBlank = styled.div`
  background: linear-gradient(
    45deg,
    #444 7.14%,
    #000 7.14%,
    #000 50%,
    #444 50%,
    #444 57.14%,
    #000 57.14%,
    #000 100%
  );
  background-size: 9.9px 9.9px;
  position: absolute;
  bottom: 0;
  height: 100%;
  left: ${calcLeft(1945)}%;
  width: ${calcWidth(1945, 1980)}%;
  text-align: center;
  padding-top: 115px;
`;
const DataMills = styled.div`
  background: ${({theme}) => theme.colors.rose}
    url('/static/millenials-graph-col-mask.png');
  background-size: cover;
  position: absolute;
  bottom: 0;
  height: calc(100% - 7rem);
  left: ${calcLeft(1980)}%;
  width: ${calcWidth(1980, 1994)}%;
  padding: 40px 12px;
  z-index: 222;
`;
const Year = styled(({className, ...rest}) => (
  <FitText class={className} {...rest} />
))`
  opacity: 0.5;
`;

class YearAnimation extends React.Component {
  render() {
    const animId = `${this.props.forClass}Anim`;
    return (
      <div>
        <PositionObserver
          instersection-ratios="1"
          on={`scroll:${animId}.seekTo(percent=event.percent)`}
        />
        <Animation
          id={animId}
          animation={{
            duration: '1',
            fill: 'both',
            direction: 'normal',
            animations: [
              {
                selector: `.${this.props.forClass}`,
                keyframes: [
                  {
                    offset: 0,
                    opacity: 0,
                  },
                  {
                    offset: this.props.offset,
                    opacity: 0,
                  },
                  {
                    offset: (this.props.offset + 0.1).toFixed(1),
                    opacity: 1,
                  },
                  {
                    offset: 1,
                    opacity: 1,
                  },
                ],
              },
            ],
          }}
        />
      </div>
    );
  }
}

class DataAnimation extends React.Component {
  render() {
    const animId = `${this.props.forClass}Anim`;
    return (
      <div>
        <PositionObserver
          instersection-ratios="1"
          on={`scroll:${animId}.seekTo(percent=event.percent)`}
        />
        <Animation
          id={animId}
          animation={{
            duration: '1',
            fill: 'both',
            direction: 'normal',
            animations: [
              {
                selector: `.${this.props.forClass}`,
                keyframes: [
                  {
                    offset: 0,
                    transform: 'translateY(50%)',
                  },
                  {
                    offset: this.props.offset,
                    transform: 'translateY(50%)',
                  },
                  {
                    offset: 1,
                    transform: 'translateY(0)',
                  },
                ],
              },
            ],
          }}
        />
      </div>
    );
  }
}

class Graph extends React.Component {
  render() {
    return (
      <div>
        <DataAnimation forClass="dataSilent" offset={0} />
        <DataAnimation forClass="dataBlank" offset={0.2} />

        <StickyContainer>
          <StickyWrapper>
            <Container>
              <GraphContainer>
                <YearAnimation forClass="yearHeader1" offset={0.0} />
                <YearAnimation forClass="yearHeader2" offset={0.1} />
                <YearAnimation forClass="yearHeader3" offset={0.2} />
                <YearAnimation forClass="yearHeader4" offset={0.3} />
                <YearAnimation forClass="yearHeader5" offset={0.4} />
                <YearAnimation forClass="yearHeader6" offset={0.5} />
                <YearAnimation forClass="yearHeader7" offset={0.6} />

                <Header>
                  <div />
                  <YearHeader
                    className="yearHeader1"
                    hideFor={device.below.tabletPortrait}
                  >
                    1900
                  </YearHeader>
                  <YearHeader className="yearHeader2">1920</YearHeader>
                  <YearHeader className="yearHeader3">1940</YearHeader>
                  <YearHeader className="yearHeader4">1960</YearHeader>
                  <YearHeader className="yearHeader5">1980</YearHeader>
                  <YearHeader className="yearHeader6">2000</YearHeader>
                  <YearHeader
                    className="yearHeader7"
                    hideFor={device.below.tabletPortrait}
                  >
                    2020
                  </YearHeader>
                  <div />
                </Header>

                <Grid>
                  <Columns>
                    <Col hideFor={device.below.tabletPortrait} />
                    <Col />
                    <Col />
                    <Col />
                    <Col />
                    <Col />
                    <Col />
                    <Col hideFor={device.below.tabletPortrait} />
                  </Columns>

                  <Data>
                    <DataSilent className="dataSilent">
                      <FitText
                        height="60"
                        width="120"
                        max-font-size="21"
                        min-font-size="12"
                        style={{fontWeight: 'bold'}}
                      >
                        Silent
                        <br />
                        Generation
                      </FitText>
                      <Year height="60" width="120" max-font-size="16">
                        1925 — 1945
                      </Year>
                    </DataSilent>

                    <DataBlank className="dataBlank">
                      <FitText height="60" width="120" max-font-size="21">
                        32 Years
                      </FitText>
                    </DataBlank>

                    <DataMills className="dataMills" id="millsColumn">
                      <FitText
                        height="60"
                        width="120"
                        max-font-size="21"
                        style={{fontWeight: 'bold'}}
                      >
                        Millenials
                      </FitText>
                      <Year height="60" width="120" max-font-size="16">
                        1980 — 1994
                      </Year>
                    </DataMills>
                  </Data>
                </Grid>
              </GraphContainer>
            </Container>
          </StickyWrapper>
        </StickyContainer>
        <PositionObserver
          id="graphObserver"
          instersection-ratios="1"
          on="scroll:graphAnim.seekTo(percent=event.percent)"
        />
        <Animation
          id="graphAnim"
          animation={{
            duration: '1',
            fill: 'both',
            direction: 'normal',
            animations: [
              {
                selector: '#millsColumn',
                keyframes: [
                  {
                    transform: 'translate3d(0,50%,0)',
                    offset: 0,
                  },
                  {
                    transform: 'translate3d(0,0,0)',
                    offset: 0.4,
                  },
                  {
                    opacity: 1,
                    offset: 0.69999,
                  },
                  {
                    transform: 'translate3d(-35%,0,200px)',
                    opacity: 0,
                    offset: 0.7,
                  },
                  {
                    transform: 'translate3d(-35%,0,200px)',
                    opacity: 0,
                    offset: 1,
                  },
                ],
              },
            ],
          }}
        />
      </div>
    );
  }
}

export default Graph;
