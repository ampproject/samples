import * as React from 'react';
import styled from 'styled-components';
import {omit} from 'ramda';

const BaseButton = (props) => {
  const realProps = omit(['color'], props);
  return <button {...realProps} />;
};

const Button = styled(BaseButton)`
  height: 50px;
  border-radius: 25px;
  background: #ff0056;
  display: ${({block}) => (block ? 'flex' : 'inline-flex')};
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  min-width: 181px;
`;

Button.FakeLink = styled(BaseButton)`
  color: ${({color}) => (color ? color : 'white')};
  display: ${({block}) => (block ? 'flex' : 'inline-flex')};
  align-items: center;
  flex-direction: row;
`;

Button.Header = styled(BaseButton)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 54px;
  width: 54px;
  border-radius: 50%;
  cursor: pointer;
  color: ${({color}) => (color ? color : 'white')};
`;

Button.White = styled(BaseButton)`
  background: #fff;
  color: #000;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.12);
  border-radius: 100em;
  padding: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export default Button;
