import * as React from 'react';
import styled from 'styled-components';

import Button from '/component/base/Button';
import Icon from '/component/base/Icon';
import Template from '/component/amp/Template';
import AccountSidebar from '/component/sidebar/AccountSidebar';
import mergeOnHandlers from '/util/mergeOnHandlers';

const Label = styled.div`
  margin-right: 12px;
`;

const ProfileButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 54px;
  width: 54px;
  background: #fff;
  color: ${({theme, inverted}) =>
    inverted ? theme.colors.gloriousWhite : theme.colors.datPurp};
  background: ${({theme, inverted}) =>
    inverted ? theme.colors.datPurp : theme.colors.gloriousWhite};
  border-radius: 50%;
`;

const InitialButton = styled.div`
  background: #ff0056;
  height: 54px;
  width: 54px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 50%;
  font-weight: 800;
`;

class AccountButton extends React.Component {
  render() {
    const {on, label, inverted} = this.props;
    return (
      <React.Fragment>
        <Button.FakeLink
          amp-access="NOT loggedIn"
          on={mergeOnHandlers(on, 'tap:amp-access.login-signIn')}
        >
          {label && <Label>Sign up / Sign in</Label>}
          <ProfileButton inverted={inverted}>
            <Icon name="account-circle-outline" size={25} />
          </ProfileButton>
        </Button.FakeLink>
        <Button.FakeLink
          amp-access-hide=""
          amp-access="loggedIn"
          on={mergeOnHandlers(on, `tap:${AccountSidebar.id}.open`)}
        >
          <InitialButton>
            <Template amp-access-template="">
              <Template.Token id="initial" />
            </Template>
          </InitialButton>
        </Button.FakeLink>
      </React.Fragment>
    );
  }
}

export default AccountButton;
