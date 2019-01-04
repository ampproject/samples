import * as React from 'react';
import styled from 'styled-components';
import {omit} from 'ramda';

import Button from './Button';

const ButtonContainer = styled((props) => {
  const realProps = omit(['color'], props);
  return <div {...realProps} />;
})`
  display: flex;
  justify-content: flex-end;
`;

const FakeLink = styled(Button.FakeLink)`
  display: block;
`;

class HeaderButtons extends React.Component {
  render() {
    return (
      <ButtonContainer color={this.props.color}>
        <FakeLink>
          <Button.Header color={this.props.color}>
            <amp-img
              layout="fixed"
              width="22"
              height="22"
              src="/static/icons/search.svg"
            />
          </Button.Header>
        </FakeLink>
        <FakeLink>
          <Button.Header color={this.props.color}>
            <amp-img
              layout="fixed"
              width="19"
              height="24"
              src="/static/icons/user.svg"
            />
          </Button.Header>
        </FakeLink>
      </ButtonContainer>
    );
  }
}

export default HeaderButtons;
