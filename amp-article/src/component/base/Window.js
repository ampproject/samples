import * as React from 'react';
import styled from 'styled-components';
import {omit} from 'ramda';

import Shape from './Shape';

const WindowContainer = styled((props) => {
  const realProps = omit(
    ['textColor', 'bgColor', 'width', 'height', 'title'],
    props,
  );
  return <div {...realProps} />;
})`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(85, 23, 208, 0.23);
  border-radius: 10px;
  width: ${({width}) => (width ? width : '')};
  height: ${({height}) => (height ? height : '')};
  position: relative;
  z-index: 1;

  &:before {
    display: block;
    width: 100%;
    height: 100%;
    content: '';
    background: linear-gradient(
      to right,
      rgba(85, 23, 208, 0) 0%,
      rgba(85, 23, 208, 0.23) 100%
    );
    background: url('/static/noise.svg') top right repeat-y;
    top: 15px;
    right: -9px;
    position: absolute;
    z-index: -1;
    border-radius: 10px;
  }
`;

const TitleBar = styled.div`
  border-bottom: 2px solid rgba(85, 23, 208, 0.23);
  border-radius: 10px 10px 0 0;
  text-align: center;
  background: #fff;
  position: relative;
  height: 38px;
`;
const Dots = styled.div`
  position: absolute;
  left: 10px;
  display: flex;
  height: 100%;
  align-items: center;

  & > div {
    margin: 0 3px;
  }
`;
const Title = styled.div`
  font-size: 12px;
  line-height: 38px;
  font-weight: 600;
  padding: 0 60px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const Content = styled.div`
  background: ${({bgColor, theme}) =>
    bgColor ? theme.colors[bgColor] : '#fff'};
  color: ${({textColor, theme}) => (textColor ? theme.colors[textColor] : '')};
  border-radius: 0 0 10px 10px;
  padding: 30px 25px;
  flex-grow: 1;
`;

class Window extends React.Component {
  render() {
    return (
      <WindowContainer {...this.props}>
        <TitleBar>
          <Dots>
            <Shape.Dot color="purpleHeart" size="8px" />
            <Shape.Dot color="purpleHeart" size="8px" />
            <Shape.Dot color="purpleHeart" size="8px" />
          </Dots>
          <Title>{this.props.title}</Title>
        </TitleBar>
        <Content bgColor={this.props.bgColor} textColor={this.props.textColor}>
          {this.props.children}
        </Content>
      </WindowContainer>
    );
  }
}

export default Window;
