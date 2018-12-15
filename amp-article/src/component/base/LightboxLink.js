import * as React from 'react';
import styled, {keyframes} from 'styled-components';
import {omit} from 'ramda';

import {device} from '/util/device';
import AmpImage from '/component/amp/AmpImage';
import AmpSocialShare from '/component/amp/AmpSocialShare';
import Text from '/component/base/Text';
import Icon from '/component/base/Icon';
import MobilePadding from '/component/base/MobilePadding';

const titleToId = (title) => `lbox-${title.toLowerCase().replace(/\s/g, '-')}`;

const LightboxLinkContainer = styled((props) => {
  const realProps = omit(
    [
      'title',
      'bgColor',
      'cardImgSrc',
      'cardImgWidth',
      'cardImgHeight',
      'innerImgSrc',
      'innerImgWidth',
      'innerImgHeight',
    ],
    props,
  );
  return <button {...realProps} on={`tap:${titleToId(props.title)}`} />;
})`
  position: relative;
  margin: 0 36px 72px 36px;
`;

const Card = styled.div`
  position: relative;
  font-size: ${({size}) => (size ? size : '16px')};
  background: #fff;
  border-radius: 10px;
  border: 2px solid #000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CardShadow = styled.div`
  position: absolute;
  z-index: 0;
  right: -10px;
  bottom: -10px;
  width: 224px;
  height: 264px;
  background: url(/static/food/card-shadow.png) no-repeat;
  background-size: cover;
`;

const Top = styled.div`
  width: 220px;
  height: 170px;
  background-color: ${({theme, bgColor}) => theme.colors[bgColor]};
  background-image: url(/static/food/inner_grain_crop@2x.png);
  background-position: bottom center;
  background-size: cover;
  background-repeat: no-repeat;
  border-bottom: 2px solid #000;
  cursor: pointer;

  & amp-img > img {
    object-fit: contain;
  }
`;

const slide = keyframes`
  0% {
      transform: translateY(40px);
    }
    100% {
      transform: translateY(0px);
    }
`;

const LightboxContainer = styled.div`
  background: #fff;
  max-width: 90%;
  width: 980px;
  display: flex;
  max-height: 90%;
  box-shadow: 0 0 0 15px rgba(0, 0, 0, 0.1);
  transition: all 1.5s ease-out;
  animation: ${slide} 0.5s 1;
  animation-fill-mode: forwards;

  ${device.below.tabletLandscape`
    flex-direction: column;
  `}
`;

const BoxLeft = styled.div`
  width: 45%;
  background-color: ${({theme, bgColor}) => theme.colors[bgColor]};
  background-image: url(/static/food/inner_grain_crop@2x.png);
  background-position: center 1px;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  ${device.below.tabletLandscape`
    width: 100%;
    height: 50%;
    height: 335px;
  `}
`;

const fadeIn = keyframes`
  0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`;

const BoxRight = styled.div`
  width: 55%;
  text-align: left;
  padding: 40px 60px;
  opacity: 0;
  animation: ${fadeIn} 0.5s 1;
  animation-fill-mode: forwards;
  animation-delay: 0.25s;

  ${device.below.tabletLandscape`
    width: 100%;
    max-height: 400px;
    overflow: scroll;
    padding: 20px 0;
  `}
`;

const CloseBtn = styled.div`
  text-align: right;
  ${device.below.tabletLandscape`
    float: right;
  `}
`;

const Icons = styled.div`
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  ${device.below.tabletLandscape`
    bottom: 3px;
  `}
`;

const Thingy = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

class Lightbox extends React.Component {
  render() {
    return (
      <amp-lightbox id={this.props.id} layout="nodisplay">
        <Thingy tabIndex="0" role="button">
          <LightboxContainer>
            <BoxLeft bgColor={this.props.bgColor}>
              <AmpImage
                layout="intrinsic"
                src={this.props.cardImgSrc}
                width={this.props.cardImgWidth}
                height={this.props.cardImgHeight}
              />
              <Icons>
                <AmpSocialShare.Facebook
                  outline
                  width="56"
                  height="56"
                  style={{marginRight: '10px'}}
                />
                <AmpSocialShare.Twitter outline width="56" height="56" />
              </Icons>
            </BoxLeft>
            <BoxRight>
              <MobilePadding>
                <CloseBtn>
                  <span
                    on={`tap:${this.props.id}.close`}
                    tabIndex="0"
                    role="button"
                    style={{cursor: 'pointer'}}
                  >
                    <Icon name="x" size="32" />
                  </span>
                </CloseBtn>
                <Text.AccentSmall>{this.props.title}</Text.AccentSmall>
                <Text.P style={{textAlign: 'left', paddingTop: '50px'}}>
                  {this.props.children}
                </Text.P>
              </MobilePadding>
            </BoxRight>
          </LightboxContainer>
        </Thingy>
      </amp-lightbox>
    );
  }
}

const SpookyItem = styled.div`
  height: 90px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

class LightboxLink extends React.Component {
  render() {
    return (
      <LightboxLinkContainer {...this.props}>
        <CardShadow />
        <Card>
          <Top bgColor={this.props.bgColor}>
            <AmpImage
              layout="responsive"
              src={this.props.cardImgSrc}
              width={this.props.cardImgWidth}
              height={this.props.cardImgHeight}
              style={{maxHeight: '100%'}}
            />
          </Top>
          <SpookyItem>
            <Text size="18px" weight="bold">
              {this.props.title}
            </Text>
            <AmpImage
              layout="fixed"
              src="/static/food/next-arrow.png"
              width="32"
              height="32"
            />
          </SpookyItem>
          <Lightbox id={titleToId(this.props.title)} {...this.props}>
            {this.props.children}
          </Lightbox>
        </Card>
      </LightboxLinkContainer>
    );
  }
}

export default LightboxLink;
