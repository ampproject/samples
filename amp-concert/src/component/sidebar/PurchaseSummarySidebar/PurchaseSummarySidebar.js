import * as React from 'react';
import styled from 'styled-components';

import Sidebar from '/component/base/Sidebar';
import PaddedContent from '/component/base/PaddedContent';
import Template from '/component/amp/Template';
import Button from '/component/base/Button';
import SpacedContent from '/component/base/SpacedContent';
import List from '/component/amp/List';
import Icon from '/component/base/Icon';

import PaymentSidebar from '/component/sidebar/PaymentSidebar';
import SeatPickerSidebar from '/component/sidebar/SeatPickerSidebar';

const HeaderText = styled.div`
  color: #000000;
  font-size: 24px;
  font-weight: 600;
  line-height: 35px;
`;

const City = styled.div`
  height: 33px;
  opacity: 0.5;
  color: #000000;
  font-size: 24px;
  line-height: 35px;
`;

const SeatMain = styled.div`
  flex: auto;
`;

const SeatContainer = styled((props) => <div {...props} />)`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 24px 0;
  border-bottom: solid 1px rgba(0, 0, 0, 0.08);
  &:last-of-type {
    border-bottom: none;
  }
`;

const SeatInfo = styled.div`
  color: #000000;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
`;

const SeatNotes = styled.div`
  opacity: 0.5;
  color: #000000;
  font-size: 16px;
  line-height: 25px;
`;

const SeatPrice = styled.div`
  color: #4c2f9b;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  text-align: right;
`;

const BigPrice = styled.div`
  color: #4c2f9b;
  font-size: 24px;
  font-weight: 500;
  line-height: 35px;
  text-align: right;
`;

const Summary = styled.div`
  color: #000000;
  font-size: 16px;
  font-weight: 600;
  line-height: 25px;
`;

const VenueAddress = styled.div`
  line-height: 25px;
`;

export default class PurchaseSummarySidebar extends React.Component {
  static id = 'purchaseSummary';
  render() {
    const header = (
      <div>
        <Sidebar.DefaultHeader
          id={PurchaseSummarySidebar.id}
          prev={SeatPickerSidebar.id}
        />
        <PaddedContent h={7}>
          <HeaderText>Purchase Summary</HeaderText>
        </PaddedContent>
      </div>
    );
    return (
      <Sidebar small header={header} id={PurchaseSummarySidebar.id}>
        <PaddedContent h={7} v={4}>
          <List
            id="purchase-summary"
            src="/api/purchase-summary.json"
            data-amp-bind-src="'/api/purchase-summary.json?show=' + currentShow + '&seats=' + currentSeats + '&floorTickets=' + floorTickets"
            single-item=""
            items="."
          >
            <Template type="amp-mustache">
              <SpacedContent f={7}>
                <SpacedContent f={1}>
                  <HeaderText>
                    <Template.Token id="date" />
                  </HeaderText>
                  <City>
                    <Template.Token id="location.city" />
                  </City>
                  <VenueAddress>
                    <div>
                      <Template.Token id="location.venue" />
                    </div>
                    <div>
                      <a href="https://www.google.com/maps/search/{{location.address}} {{location.city}}">
                        <Template.Token id="location.address" />,{' '}
                        <Template.Token id="location.city" />{' '}
                        <Icon size={16} name="arrow-top-right" />
                      </a>
                    </div>
                  </VenueAddress>
                </SpacedContent>

                <SpacedContent f={3}>
                  <Summary>
                    <Template.Token id="summary" />
                  </Summary>
                  <div>
                    <Template.Loop id="seats">
                      <SeatContainer>
                        <SeatMain>
                          <SeatInfo>
                            <Template.Token id="^isFloor" />
                            Section <Template.Token id="column" /> Row{' '}
                            <Template.Token id="row" />
                            <Template.Token id="/isFloor" />
                            <Template.Token id="#isFloor" />
                            Floor seating
                            <Template.Token id="/isFloor" />
                          </SeatInfo>
                          <SeatNotes>
                            <Template.Token id="notes" />
                          </SeatNotes>
                        </SeatMain>
                        <SeatPrice>
                          <Template.Token id="formattedPrice" />
                        </SeatPrice>
                      </SeatContainer>
                    </Template.Loop>
                  </div>
                  <SeatContainer>
                    <SeatMain>
                      <SeatInfo>Total</SeatInfo>
                    </SeatMain>
                    <BigPrice>
                      <Template.Token id="total" />
                    </BigPrice>
                  </SeatContainer>
                </SpacedContent>
                <SpacedContent f={2}>
                  <Button
                    block
                    on={`tap:${PurchaseSummarySidebar.id}.close,${
                      PaymentSidebar.id
                    }.open`}
                  >
                    Continue
                  </Button>
                  <Button.FakeLink
                    block
                    on={`tap:${PurchaseSummarySidebar.id}.close,${
                      SeatPickerSidebar.id
                    }.open`}
                  >
                    Back to seat selection
                  </Button.FakeLink>
                </SpacedContent>
              </SpacedContent>
            </Template>
          </List>
        </PaddedContent>
      </Sidebar>
    );
  }
}
