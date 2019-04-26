import * as React from 'react';
import styled from 'styled-components';

const BaseButton = styled(({block: _block, ...rest}) => {
  return <button {...rest} />;
})`
  white-space: nowrap;
  &:hover {
    cursor: pointer;
  }
`;

const Button = styled(BaseButton)`
  height: 50px;
  border-radius: 25px;
  background-color: #ff0056;
  box-shadow: 2px 2px 12px 0 rgba(255, 0, 86, 0.12);
  display: ${({block}) => (block ? 'flex' : 'inline-flex')};
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  min-width: 181px;
  ${({block}) => {
    if (block) {
      return 'width: 100%';
    }
    return '';
  }}
  &[disabled] {
    font-weight: 400;
    background-color: #bdbbbe;
    color: #000;
    box-shadow: none;
  }
`;

Button.FakeLink = styled(BaseButton)`
  color: ${({theme}) => theme.colors.datPurp};
  display: ${({block}) => (block ? 'flex' : 'inline-flex')};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  ${({block}) => {
    if (block) {
      return 'width: 100%';
    }
    return '';
  }}
  &:link {
    position: relative;
    color: ${({theme}) => theme.colors.datPurp};
    text-decoration: underline;
  }
`;

export default Button;
