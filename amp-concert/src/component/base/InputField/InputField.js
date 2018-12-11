import * as React from 'react';
import styled from 'styled-components';
import Input from '/component/base/Input';
import SpacedContent from '/component/base/SpacedContent';

const FieldLabel = styled.label`
  display: block;
`;

class InputField extends React.Component {
  render() {
    const {label, ...rest} = this.props;
    return (
      <FieldLabel>
        <SpacedContent f={1}>
          <div>{label}</div>
          <Input {...rest} />
        </SpacedContent>
      </FieldLabel>
    );
  }
}
export default InputField;
