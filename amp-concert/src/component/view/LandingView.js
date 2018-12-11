import * as React from 'react';
import styled, {createGlobalStyle} from 'styled-components';

import Header from '/component/partial/Header';
import Footer from '/component/partial/Footer';
import Template from '/component/amp/Template';
import Loader from '/component/base/Loader';

import Container from '/component/base/Container';
import Button from '/component/base/Button';
import Icon from '/component/base/Icon';

import SeatPickerSidebar from '/component/sidebar/SeatPickerSidebar';
import LocationPickerSidebar from '/component/sidebar/LocationPickerSidebar';

import handleAmpBindClassName from '/util/handleAmpBindClassName';
import {below, above} from '/util/css';

const City = styled.div`
  color: #000;
  font-size: 80px;
  font-weight: 500;
  line-height: 1.5;
  display: flex;
  align-items: baseline;
  ${below.phone`
    font-size: 40px;
  `}
`;

const Details = styled.div`
  display: none;
`;

const CityButton = styled((props) => <button {...props} />)`
  display: flex;
  align-items: baseline;
  ${Icon} {
    opacity: 0;
    position: relative;
    bottom: -10px;
  }
  &:hover {
    cursor: pointer;
    ${City} {
      color: #4c2f9b;
    }
    ${Icon} {
      opacity: 1;
    }
  }
  &:active,
  &:focus {
    outline: none;
    border: none;
    border-color: transparent;
  }
`;

class AutoSuggest extends React.Component {
  render() {
    return (
      <div style={{position: 'relative'}}>
        <amp-state
          id="currentLocationsList"
          src="/api/cities.json"
          data-amp-bind-src={`query ?
            "/api/cities.json?query=" + query :
            "/api/cities.json"`}
        />
        <amp-list
          layout="fixed-height"
          height="500"
          src="/api/cities.json"
          data-amp-bind-src={`query ?
            "/api/cities.json?query=" + query :
            "/api/cities.json"`}
          id="autosuggest-list"
          noloading=""
        >
          <div placeholder="">
            <Loader />
          </div>
          <div fallback="">Failed to load data.</div>
          <Template>
            <CityButton
              on={`
              tap:
                AMP.setState({
                  ticketCount: 0,
                  currentLocationIndex: {{index}},
                  currentLocation: "{{id}}",
                  currentShow: "{{shows.0.id}}"
                }),
                ${SeatPickerSidebar.id}.open
              `}
            >
              <City>
                <Template.Token id="city" />{' '}
                <Icon name="arrow-top-right" size="1.2em" />
              </City>
              <Details>
                <Template.Token id="administrative" />{' '}
                <Template.Token id="country" />
              </Details>
            </CityButton>
          </Template>
        </amp-list>
      </div>
    );
  }
}

const CalloutText = styled.div`
  color: #4c2f9b;
  font-family: Limelight;
  font-size: 110px;
  line-height: 110px;
  ${below.phone`
    display: none;
  `}
`;

const CalloutTextMobile = styled.div`
  font-size: 54px;
  line-height: 1.11;
  color: #4c2f9b;
  font-family: Limelight;
  ${above.phone`
    display: none;
  `}
`;

const TourInfo = styled.div`
  margin-top: 32px;
  color: #4c2f9b;
  font-size: 24px;
  line-height: 1.458333333333333;
  ${below.phone`
    font-size: 16px;
    margin-top: 16px;
  `}
`;

const Emphasis = styled.strong`
  font-weight: bold;
`;

const CalloutButton = styled(Button)`
  margin-top: 24px;
  pointer-events: auto;
`;

const GlobalStyles = createGlobalStyle`
  body {
    background: #FDBCA8;
  }
`;

const BandContainer = styled((props) => {
  return <div {...handleAmpBindClassName(props)} />;
})`
  flex: auto;
  align-self: stretch;
  position: relative;
  margin: -90px -90px 0 -90px;
  ${below.bandFailure`
    margin: 0 0 0 -400px;
  `}
  ${below.phone`
    margin: -40px -40px 0 -40px;
    min-height: 100vw;
  `}
`;

const BandStaticWrapper = styled((props) => <div {...props} />)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;
const BandInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: -50px;
  right: -50px;
  bottom: -50px;
  top: -50px;
  ${below.phone`
    left: -85px;
    right: -85px;
    bottom: -85px;
    top: -85px;
  `}
`;

const BandStatic = (props) => {
  return (
    <BandStaticWrapper {...props}>
      <BandInner>
        <amp-img
          src="/static/static-band.jpg"
          layout="intrinsic"
          width="2098"
          height="1664"
        />
      </BandInner>
    </BandStaticWrapper>
  );
};

class Band extends React.Component {
  render() {
    return (
      <BandContainer {...this.props}>
        <amp-3d-gltf
          layout="fill"
          width="100"
          height="100"
          alpha="true"
          antialiasing="true"
          autoRotate="true"
          enableZoom="false"
          src="https://s3.us-west-2.amazonaws.com/amp-demo-static-resources/viking-band.glb"
        >
          <BandStatic placeholder="" />
          <BandStatic fallback="" />
        </amp-3d-gltf>
      </BandContainer>
    );
  }
}

const Content = styled((props) => {
  return <div {...handleAmpBindClassName(props)} />;
})`
  pointer-events: none;
  z-index: 22;
  position: relative;
  ${below.phone`
    text-align: center;
  `}
`;

const MainLayout = styled.section`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  flex: auto;
`;

const BetterContainer = styled(Container)`
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${below.phone`
    margin-top: 32px;
    flex-direction: column;
  `}
`;

class LandingView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyles />

        <MainLayout>
          <Header />
          <BetterContainer>
            <Content data-amp-bind-class="query ? 'magic-hidden' : ''">
              <CalloutText>
                Olga
                <br /> And The
                <br /> Kings
              </CalloutText>
              <CalloutTextMobile>
                Olga &
                <br /> The Kings
              </CalloutTextMobile>
              <TourInfo>
                <Emphasis>On Tour</Emphasis>
                <br />
                All over the World
                <br />
                Oct. 20 - May 24
              </TourInfo>

              <CalloutButton
                on={`tap:AMP.setState({}),${LocationPickerSidebar.id}.open`}
              >
                Get Tickets Now
              </CalloutButton>
            </Content>

            <Band data-amp-bind-class="query ? 'magic-hidden' : ''" />
          </BetterContainer>

          <Footer />
        </MainLayout>
        <div
          className="magic-hidden"
          data-amp-bind-class="query ? '' : 'magic-hidden'"
          style={{
            position: 'absolute',
            top: '120px',
            left: '24%',
            right: 0,
            bottom: 0,
          }}
        >
          <AutoSuggest />
        </div>
      </React.Fragment>
    );
  }
}

export default LandingView;
