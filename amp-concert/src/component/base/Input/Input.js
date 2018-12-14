import * as React from 'react';
import styled from 'styled-components';

const InputBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: solid 1px transparent;
  border-radius: 25px;
  pointer-events: none;
`;

const InputContainer = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  color: ${({theme}) => theme.colors.heartOfDarkness};
  background: #eaeaea;
  height: 3.125em;
  border-radius: 25px;
  padding-left: 24px;
  padding-right: 24px;

  > input {
    min-width: 0;
    flex: auto;
    align-self: stretch;
    line-height: 1.6; /* safari ripperonis without this */
    &:focus {
      outline: none;
      ~ ${InputBorder} {
        box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, 0.08);
        border-color: ${({theme}) => theme.colors.datPurp};
      }
    }
  }
`;

class Input extends React.Component {
  render() {
    const {className, children, ...rest} = this.props;
    return (
      <InputContainer className={className}>
        <input {...rest} />
        {children}
        <InputBorder />
      </InputContainer>
    );
  }
}

export default Input;
