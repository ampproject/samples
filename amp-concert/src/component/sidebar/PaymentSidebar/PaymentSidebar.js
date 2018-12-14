import * as React from 'react';
import styled from 'styled-components';

import Sidebar from '/component/base/Sidebar';
import PaddedContent from '/component/base/PaddedContent';
import Button from '/component/base/Button';
import Template from '/component/amp/Template';
import SpacedContent from '/component/base/SpacedContent';
import InputField from '/component/base/InputField';
import Loader from '/component/base/Loader';
import Separator from '/component/base/Separator';
import Grid from '/component/base/Grid';
import Icon from '/component/base/Icon';

import PurchaseSummarySidebar from '/component/sidebar/PurchaseSummarySidebar';

const HeaderText = styled.div`
  color: #000000;
  font-size: 24px;
  font-weight: 600;
  line-height: 35px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
`;

const MainInfoContainer = styled.div`
  flex: auto;
`;

const MainInfo = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 25px;
`;

const Summary = styled.div`
  color: #000000;
  font-size: 16px;
  line-height: 25px;
`;

const Price = styled.div`
  color: #4c2f9b;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  text-align: right;
`;

export default class PaymentSidebar extends React.Component {
  static id = 'payment';
  render() {
    const header = (
      <div>
        <Sidebar.DefaultHeader
          id={PaymentSidebar.id}
          prev={PurchaseSummarySidebar.id}
        />
        <PaddedContent h={7}>
          <HeaderText>Payment</HeaderText>
        </PaddedContent>
      </div>
    );
    return (
      <Sidebar small header={header} id={PaymentSidebar.id}>
        <PaddedContent h={7} v={4}>
          <SpacedContent f={3}>
            <amp-list
              id="payment-summary"
              width="auto"
              height="48"
              layout="fixed-height"
              src="/api/purchase-summary.json"
              data-amp-bind-src="'/api/purchase-summary.json?show=' + currentShow + '&seats=' + currentSeats + '&floorTickets=' + floorTickets"
              single-item=""
              items="."
              noloading=""
              reset-on-refresh=""
            >
              <div placeholder="">
                <Loader />
              </div>
              <div fallback="">Failed to load data.</div>
              <Template type="amp-mustache">
                <Info>
                  <MainInfoContainer>
                    <MainInfo>
                      <Template.Token id="date" /> •{' '}
                      <Template.Token id="location.city" />
                    </MainInfo>
                    <Summary>
                      <Template.Token id="summary" />
                    </Summary>
                  </MainInfoContainer>
                  <Price>
                    <Template.Token id="total" />
                  </Price>
                </Info>
              </Template>
            </amp-list>
            <Separator />
            <form action-xhr="/api/payment.json" method="POST">
              <SpacedContent f={4}>
                <InputField
                  label="First & Last Name"
                  name="name"
                  placeholder="Card holder name"
                />
                <InputField
                  label="Email"
                  name="email"
                  placeholder="Email address"
                />
                <InputField
                  label="Credit Card Number"
                  name="ccnum"
                  placeholder="Enter credit card number"
                />
                <Grid>
                  <Grid.Col cols={6}>
                    <InputField
                      label="Expiracy Date"
                      name="exp"
                      placeholder="MM / YYYY"
                    />
                  </Grid.Col>
                  <Grid.Col cols={6}>
                    <InputField
                      label={
                        <span>
                          CVC{' '}
                          <span style={{color: '#4C2F9B'}}>
                            <Icon size="16" name="help-circle-outline" />
                          </span>
                        </span>
                      }
                      name="cvv"
                      placeholder="3 digits"
                    />
                  </Grid.Col>
                </Grid>
                <Button block>Proceed to payment</Button>
              </SpacedContent>
            </form>
          </SpacedContent>
        </PaddedContent>
      </Sidebar>
    );
  }
}
