import * as React from 'react';
import styled from 'styled-components';

import SpacedContent from '/component/base/SpacedContent';

const FooterContainer = styled.footer`
  color: #fff;
  font: 300 18px/28px Roboto;
  text-align: center;
  padding-bottom: 130px;
`;

const Faded = styled.span`
  opacity: 0.5;
`;

class Footer extends React.Component {
  render() {
    return (
      <FooterContainer>
        <SpacedContent f={4}>
          <div>
            <div>
              <Faded>Article written by</Faded> AMP Team
            </div>
            <div>
              <Faded>Design by</Faded> AMP Team
            </div>
            <div>
              <Faded>Illustrations by</Faded> AMP Team
            </div>
          </div>
          <div>
            <div>
              <Faded>Statistics from</Faded>
            </div>
            <div>GlobalWebIndex Q1 2017</div>
            <div>The Washington Post</div>
            <div>National Centre for Education</div>
            <div>YFSMagazine</div>
            <div>…</div>
          </div>
          <div>
            <div>
              <Faded>Powered by</Faded> AMP
            </div>
            <div>
              <Faded>AMP © Copyright 2018</Faded>
            </div>
          </div>
        </SpacedContent>
      </FooterContainer>
    );
  }
}

export default Footer;
