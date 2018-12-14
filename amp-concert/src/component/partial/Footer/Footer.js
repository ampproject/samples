import * as React from 'react';
import styled, {createGlobalStyle} from 'styled-components';

import Container from '/component/base/Container';
import Icon from '/component/base/Icon';
import CountryInfo from '/component/partial/CountryInfo';

import handleAmpBindClassName from '/util/handleAmpBindClassName';
import {below} from '/util/css';

const CountryCallout = styled((props) => {
  return <div {...handleAmpBindClassName(props)} />;
})`
  ${below.phone`
    display: none;
  `}
  width: 290px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, 0.12);
  position: absolute;
  right: 0;
  bottom: 0;
  &.closed {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    ${below.phone`
      display: none;
    `}
  }
`;

const AmpGeoDisplayHack = createGlobalStyle`
  .amp-iso-country-ca {
    ${CountryInfo.Flag} {
      &:after {
        background-image: url(/static/flag-ca.png);
      }
    }
  }
  .amp-iso-country-us {
    ${CountryInfo.Flag} {
      &:after {
        background-image: url(/static/flag-us.png);
      }
    }
  }
`;
const CloseButton = styled((props) => <button {...props} />)`
  display: inline-block;
  position: absolute;
  right: 16px;
  top: 16px;
  color: ${({theme}) => theme.colors.datPurp};
`;
const CountryCalloutShowHide = styled((props) => {
  return <div {...handleAmpBindClassName(props)} />;
})`
  &.closed {
    display: none;
  }
`;
class Footer extends React.Component {
  render() {
    return (
      <Container>
        <amp-geo layout="nodisplay" />
        <AmpGeoDisplayHack />
        <footer style={{position: 'relative'}}>
          <CountryCallout
            className="closed"
            data-amp-bind-class={`
              countryCalloutOpen == "true" ? "" : "closed"
            `}
          >
            <CountryCalloutShowHide
              data-amp-bind-class={`
                countryCalloutOpen == "true" ? "closed" : ""
              `}
            >
              <button
                on={`
                tap:AMP.setState({countryCalloutOpen: "true"})
              `}
              >
                <CountryInfo.Flag />
              </button>
            </CountryCalloutShowHide>
            <CountryCalloutShowHide
              className="closed"
              data-amp-bind-class={`
                countryCalloutOpen == "true" ? "" : "closed"
              `}
            >
              <CloseButton
                on={`
                  tap:AMP.setState({countryCalloutOpen: "false"})
                `}
              >
                <Icon name="close" />
              </CloseButton>
              <CountryInfo />
            </CountryCalloutShowHide>
          </CountryCallout>
        </footer>
      </Container>
    );
  }
}
export default Footer;
