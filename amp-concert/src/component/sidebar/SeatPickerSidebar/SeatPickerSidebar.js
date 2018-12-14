import * as React from 'react';
import styled from 'styled-components';

import Sidebar from '/component/base/Sidebar';
import SpacedContent from '/component/base/SpacedContent';
import PaddedContent from '/component/base/PaddedContent';
import Template from '/component/amp/Template';
import TabPanel from '/component/base/TabPanel';
import Button from '/component/base/Button';
import Loader from '/component/base/Loader';

import SeatLayoutPicker from './SeatLayoutPicker';
import SeatListPicker from './SeatListPicker';
import FloorPicker from './FloorPicker';
import SectionLabel from './SectionLabel';

import PurchaseSummarySidebar from '/component/sidebar/PurchaseSummarySidebar';
import LocationPickerSidebar from '/component/sidebar/LocationPickerSidebar';

import {below} from '/util/css';

const City = styled.div`
  color: #000000;
  font-size: 80px;
  font-weight: 500;
  line-height: 1.3375;
  ${below.phone`
    font-size: 34px;
  `}
`;

const Details = styled.div`
  color: #000000;
  font-family: Poppins;
  font-size: 24px;
  line-height: 1.45833;
  ${below.phone`
    font-size: 18px;
  `}
`;

const Faded = styled.div`
  opacity: 0.5;
`;

const PurchaseButton = styled(Button)`
  min-width: 310px;
`;

const PillSelectContainer = styled(({className, ...rest}) => (
  <amp-selector class={className} {...rest} />
))`
  display: flex;
  flex-wrap: wrap;
`;

const PillSelectItem = styled((props) => {
  return <div {...props} />;
})`
  height: 50px;
  color: #4c2f9b;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  border: 1px solid #4c2f9b;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: auto;
  &:first-of-type {
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
  }
  &:last-of-type {
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
  }

  &[selected][option] {
    border: 1px solid #4c2f9b;
    outline: none;
    background-color: #4c2f9b;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }
`;

class SeatPickerHeader extends React.Component {
  render() {
    return (
      <div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <City data-amp-bind-text="currentLocationsList.items[currentLocationIndex].city" />
          <Details data-amp-bind-text="currentLocationsList.items[currentLocationIndex].venue" />
          <Details data-amp-bind-text="currentLocationsList.items[currentLocationIndex].address + ', ' + currentLocationsList.items[currentLocationIndex].city" />
        </div>
      </div>
    );
  }
}

class ShowDatePicker extends React.Component {
  render() {
    return (
      <div>
        <amp-state
          id="currentShowObject"
          src="/api/show.json"
          data-amp-bind-src="'/api/show.json?id=' + currentShow"
        />
        <amp-list
          id="show-location"
          width="auto"
          height="131"
          layout="fixed-height"
          src="/api/show.json"
          data-amp-bind-src="'/api/show.json?id=' + currentShow"
          single-item=""
          items="."
          noloading=""
          reset-on-refresh=""
        >
          <div placeholder="">
            <Loader />
          </div>
          <div fallback="">Failed to load data.</div>
          <Template>
            <SpacedContent f={2}>
              <SectionLabel>Date</SectionLabel>
              <PillSelectContainer on="select:AMP.setState({currentShow: event.targetOption, ticketCount: 0})">
                <Template.Token id="#location.shows" />

                <Template.Token id="#selected" />
                <PillSelectItem selected="selected" option="{{id}}">
                  <Template.Token id="date" />
                </PillSelectItem>
                <Template.Token id="/selected" />

                <Template.Token id="^selected" />
                <PillSelectItem option="{{id}}">
                  <Template.Token id="date" />
                </PillSelectItem>
                <Template.Token id="/selected" />

                <Template.Token id="/location.shows" />
              </PillSelectContainer>
              <Faded>
                <Template.Token id="totalSeats" /> tickets available · Starting
                from $<Template.Token id="basePrice" />
              </Faded>
            </SpacedContent>
          </Template>
        </amp-list>
      </div>
    );
  }
}

const SeatHeader = styled.div`
  display: flex;
  flex-direction: row;
  ${below.phone`
    flex-direction: column;
    > *:first-child {
      margin-bottom: 8px;
    }
  `}
`;

const SeatPickerFooter = styled.div`
  background: #fff;
  box-shadow: 0 -8px 14px 0 rgba(48, 48, 48, 0.08);
`;

const SeatPickerFooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class SeatPicker extends React.Component {
  render() {
    return (
      <SpacedContent f={2}>
        <div>
          <SeatHeader>
            <SectionLabel>Seat Location</SectionLabel>
            <TabPanel id="seat-picker-mode" align="right">
              <TabPanel.Tab value="list" label="Ticket List" selected />
              <TabPanel.Tab value="chart" label="Seating Chart" />
            </TabPanel>
          </SeatHeader>
        </div>
        <TabPanel.Portal id="seat-picker-mode">
          <TabPanel.Tab value="list">
            <SeatListPicker />
          </TabPanel.Tab>
          <TabPanel.Tab value="chart">
            <SeatLayoutPicker />
          </TabPanel.Tab>
        </TabPanel.Portal>
      </SpacedContent>
    );
  }
}

class SeatPickerSidebar extends React.Component {
  static id = 'sidebarSeatPicker';
  render() {
    const header = (
      <div>
        <Sidebar.DefaultHeader
          id={SeatPickerSidebar.id}
          prev={LocationPickerSidebar.id}
        />
        <PaddedContent h={7}>
          <SeatPickerHeader />
        </PaddedContent>
      </div>
    );
    const footer = (
      <SeatPickerFooter>
        <PaddedContent f={2}>
          <SeatPickerFooterContent>
            <PurchaseButton
              on={`tap:${SeatPickerSidebar.id}.close,${
                PurchaseSummarySidebar.id
              }.open`}
              data-amp-bind-text={`
                ticketCount > 0 ? ('Purchase ' + ticketCount + (ticketCount == 1 ? ' ticket' : ' tickets') + ' - $' + totalPrice) : 'Select a seat location first'
              `}
              data-amp-bind-disabled={`
                !(ticketCount > 0)
              `}
            >
              Purchase ticket
            </PurchaseButton>
          </SeatPickerFooterContent>
        </PaddedContent>
      </SeatPickerFooter>
    );
    return (
      <Sidebar id={SeatPickerSidebar.id} header={header} footer={footer}>
        <PaddedContent h={7} v={4}>
          <SpacedContent f={4}>
            <ShowDatePicker />
            <div>
              <SpacedContent f={2}>
                <SectionLabel>Tickets</SectionLabel>
                <TabPanel
                  as={PillSelectContainer}
                  id="seat-picker-area"
                  on={`select:AMP.setState({
                    ticketCount: event.targetOption == 'seat' ? 0 : 1

                  }),AMP.setState({floorTickets: event.targetOption == 'seat' ? 0 : 1}),
                  AMP.setState({totalPrice: event.targetOption == 'seat' ? 0 : currentShowObject.floorPrice}),
                  AMP.setState({internalCurrentSeats: []})`}
                >
                  <TabPanel.Tab
                    as={PillSelectItem}
                    value="seat"
                    label={'Seat'}
                    selected
                  />
                  <TabPanel.Tab
                    as={PillSelectItem}
                    value="floor"
                    label={'Floor'}
                  />
                </TabPanel>
              </SpacedContent>
            </div>
            <TabPanel.Portal id="seat-picker-area">
              <TabPanel.Tab value="seat">
                <SeatPicker />
              </TabPanel.Tab>
              <TabPanel.Tab value="floor">
                <FloorPicker />
              </TabPanel.Tab>
            </TabPanel.Portal>
          </SpacedContent>
        </PaddedContent>
      </Sidebar>
    );
  }
}

export default SeatPickerSidebar;
