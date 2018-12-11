import * as React from 'react';
import styled from 'styled-components';

import Button from '/component/base/Button';
import Icon from '/component/base/Icon';

const LogoutButtonWrapper = styled.div`
  height: 54px;
  width: 54px;
  border: 2px solid #4c2f9b;
  border-radius: 50%;
  margin-left: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default class LogoutButton extends React.Component {
  render() {
    return (
      <Button.FakeLink {...this.props}>
        <div>Log out</div>
        <LogoutButtonWrapper>
          <Icon name="logout-variant" />
        </LogoutButtonWrapper>
      </Button.FakeLink>
    );
  }
}
