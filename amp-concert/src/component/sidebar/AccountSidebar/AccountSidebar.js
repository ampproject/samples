import * as React from 'react';
import styled from 'styled-components';

import Sidebar from '/component/base/Sidebar';
import Template from '/component/amp/Template';
import SpacedContent from '/component/base/SpacedContent';
import PaddedContent from '/component/base/PaddedContent';
import List from '/component/amp/List';
import LogoutButton from '/component/partial/LogoutButton';
import AccountButton from '/component/partial/AccountButton';
import Button from '/component/base/Button';
import Separator from '/component/base/Separator';

import {below} from '/util/css';

const Faded = styled.div`
  opacity: 0.5;
  font-size: 16px;
  line-height: 25px;
`;

const Heading = styled.div`
  color: #000000;
  font-size: 24px;
  font-weight: 600;
  line-height: 35px;
`;

const Subheading = styled.div`
  color: #000000;
  font-size: 16px;
  font-weight: bold;
  line-height: 25px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  > *:first-child {
    flex: auto;
  }
`;

const Date = styled.span`
  font-weight: 800;
  ${below.phone`
    display: block;
  `}
`;

const City = styled.span`
  &:before {
    content: ' – ';
    display: inline;
    ${below.phone`
      display: none;
    `}
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin: 24px 0;
`;

class TicketRow extends React.Component {
  render() {
    const {inThePast} = this.props;
    return (
      <Row>
        <div style={{lineHeight: 1.4}}>
          <Date>
            <Template.Token id="date" />
          </Date>{' '}
          <City>
            <Template.Token id="city" />
          </City>
          <Faded>
            <Template.Token id="summary" />
          </Faded>
        </div>
        <div>
          <Button.FakeLink as="a" href="{{url}}">
            {inThePast ? 'View receipt' : 'Download tickets'}
          </Button.FakeLink>
        </div>
      </Row>
    );
  }
}

class AccountSidebar extends React.Component {
  static id = 'sidebarAccount';
  render() {
    const header = (
      <PaddedContent h={7}>
        <SidebarHeader>
          <Sidebar.CloseButton id={AccountSidebar.id} />
          <div style={{marginLeft: 16}}>
            <LogoutButton
              on={`tap:${AccountSidebar.id}.close,amp-access.login-signOut`}
            />
          </div>
        </SidebarHeader>
      </PaddedContent>
    );

    return (
      <Sidebar small id={AccountSidebar.id} header={header}>
        <PaddedContent h={7} v={3}>
          <div amp-access="loggedIn">
            <SpacedContent f={8}>
              <SpacedContent f={1}>
                <AccountButton />
                <Heading>
                  <Template
                    amp-access-template="amp-access-template"
                    type="amp-mustache"
                  >
                    Welcome <Template.Token id="name" />
                  </Template>
                </Heading>
              </SpacedContent>
              <div>
                Your email
                <Faded>
                  <Template
                    amp-access-template="amp-access-template"
                    type="amp-mustache"
                  >
                    <Template.Token id="email" />
                  </Template>
                </Faded>
              </div>
            </SpacedContent>
          </div>
        </PaddedContent>
        <Separator />
        <PaddedContent h={7} v={3}>
          <SpacedContent f={3}>
            <Subheading>Your tickets & purchases</Subheading>
            <List
              id="upcoming-tickets"
              src="/api/account/tickets.json"
              single-item=""
              items="."
            >
              <Template type="amp-mustache">
                <SpacedContent f={10}>
                  <SpacedContent f={2}>
                    <Faded>To come</Faded>
                    <Template.Loop id="items">
                      <Template.Token id="^past" />
                      <TicketRow />
                      <Template.Token id="/past" />
                    </Template.Loop>
                  </SpacedContent>

                  <SpacedContent f={2}>
                    <Faded>Past</Faded>
                    <Template.Loop id="items">
                      <Template.Token id="#past" />
                      <TicketRow inThePast />
                      <Template.Token id="/past" />
                    </Template.Loop>
                  </SpacedContent>
                </SpacedContent>
              </Template>
            </List>
          </SpacedContent>
        </PaddedContent>
      </Sidebar>
    );
  }
}

export default AccountSidebar;
