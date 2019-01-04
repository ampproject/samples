import * as React from 'react';
import styled from 'styled-components';

import AmpImage from '/component/amp/AmpImage';
import Confetti, {presets} from '/component/base/Confetti';

const IntroContainer = styled.div`
  height: 100vh;
  background: linear-gradient(
    180deg,
    ${({theme}) => theme.colors.carnationPink} 0%,
    ${({theme}) => theme.colors.mirage} 100%
  );
  margin-top: -10vh;
  position: relative;
  z-index: 1;
`;
const Content = styled.div`
  position: absolute;
  bottom: 10vh;
  width: 100%;
  text-align: center;
`;

class SleepIntro extends React.Component {
  render() {
    return (
      <IntroContainer style={this.props.style}>
        <Content>
          <Confetti
            pieces={presets.basic}
            color="white"
            style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              transform: 'translate(-170%, -40%)',
            }}
          />
          <AmpImage
            src="/static/sleep/moon@2x.png"
            layout="responsive"
            width="230"
            height="230"
            style={{maxWidth: '230px', margin: '0 auto', display: 'block'}}
          />
          <Confetti
            pieces={presets.basic}
            color="white"
            style={{
              position: 'absolute',
              top: '0',
              left: '55%',
              transform: 'translate(-7%, 6%) rotate(100deg)',
            }}
          />
        </Content>
      </IntroContainer>
    );
  }
}

export default SleepIntro;
