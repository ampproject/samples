import * as React from 'react';
import styled from 'styled-components';
import qs from 'qs';

import InputField from '/component/base/InputField';
import Button from '/component/base/Button';
import SpacedContent from '/component/base/SpacedContent';
import PaddedContent from '/component/base/PaddedContent';
import TabPanel from '/component/base/TabPanel';
import Template from '/component/amp/Template';

const Centered = styled.div`
  display: flex;
  justify-content: center;
  flex: auto;
`;

const Error = styled.div`
  color: #ff0056;
  font-size: 16px;
  line-height: 25px;
`;

class LoginForm extends React.Component {
  render() {
    const {returnUrl} = this.props;
    return (
      <form method="POST" action-xhr="/api/account/login.json">
        <input type="hidden" name="returnUrl" value={returnUrl} />
        <div submit-error="" style={{marginBottom: 32}}>
          <Template>
            <Error>That email / password combination is not valid.</Error>
          </Template>
        </div>
        <SpacedContent f={3}>
          <InputField name="email" label="Email" />
          <InputField name="password" type="password" label="Password" />
          <Button.FakeLink block>Forgotten your password?</Button.FakeLink>
          <div submitting="">
            <template type="amp-mustache">
              Form submitting... Thank you for waiting.
            </template>
          </div>
          <Centered>
            <Button block>Login</Button>
          </Centered>
        </SpacedContent>
      </form>
    );
  }
}

class SignupForm extends React.Component {
  render() {
    const {returnUrl} = this.props;
    return (
      <form method="POST" action-xhr="/api/account/signup.json">
        <input type="hidden" name="returnUrl" value={returnUrl} />
        <SpacedContent f={3}>
          <InputField name="name" label="Name" />
          <InputField name="email" label="Email" />
          <InputField name="password" type="password" label="Password" />
          <Centered>
            <Button block>Sign up</Button>
          </Centered>
        </SpacedContent>
      </form>
    );
  }
}

class LoginView extends React.Component {
  render() {
    // TODO: FIXME: Error handling: What if someone fails to provide a `return`
    // parameter or query string altogether?
    const {location} = this.props;
    const params = qs.parse(location.search.substr(1));
    const returnUrl = params.return;
    return (
      <PaddedContent f={3}>
        <Centered>
          <div style={{maxWidth: '381px'}}>
            <TabPanel id="login">
              <TabPanel.Tab big selected label="Login" value="login">
                <LoginForm returnUrl={returnUrl} />
              </TabPanel.Tab>
              <TabPanel.Tab big label="Sign Up" value="signup">
                <SignupForm returnUrl={returnUrl} />
              </TabPanel.Tab>
            </TabPanel>
          </div>
        </Centered>
      </PaddedContent>
    );
  }
}

export default LoginView;
