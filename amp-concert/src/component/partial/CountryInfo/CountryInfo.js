import * as React from 'react';
import styled from 'styled-components';

import Separator from '/component/base/Separator';
import Button from '/component/base/Button';
import SpacedContent from '/component/base/SpacedContent';
import PaddedContent from '/component/base/PaddedContent';

import ReviewsSidebar from '/component/sidebar/ReviewsSidebar';

const Faded = styled.span`
  opacity: 0.5;
`;

const CountryFlag = styled.span`
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-image: url(/static/flag-unknown.png);
    background-size: contain;
    background-position: 50% 50%;
  }
`;
const Heading = styled.div`
  font-weight: 600;
  line-height: 25px;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  line-height: 21px;
  font-size: 14px;
`;
export default class CountryInfo extends React.Component {
  static Flag = CountryFlag;
  render() {
    return (
      <Text>
        <PaddedContent f={3}>
          <SpacedContent f={1}>
            <Heading>
              <div style={{marginRight: '0.5em'}}>Welcome</div>
              <CountryFlag />
            </Heading>
            <p>
              Olga & The Kings are on tour in the US from October 20th to
              November 24th. Make sure to grab some tickets for an incredible
              live show.
            </p>
            <Button.FakeLink on={`tap:${ReviewsSidebar.id}.open`}>
              Read live reviews
            </Button.FakeLink>
          </SpacedContent>
        </PaddedContent>
        <Separator />
        <PaddedContent f={3}>
          <Faded>Not in the US</Faded>
        </PaddedContent>
      </Text>
    );
  }
}
