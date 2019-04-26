/* eslint-disable no-use-before-define */
import * as React from 'react';
import styled from 'styled-components';

import Sidebar from '/component/base/Sidebar';
import DatePicker from '/component/base/DatePicker';
import TabPanel from '/component/base/TabPanel';
import Template from '/component/amp/Template';
import Icon from '/component/base/Icon';
import PaddedContent from '/component/base/PaddedContent';
import SeatPickerSidebar from '/component/sidebar/SeatPickerSidebar';
import Separator from '/component/base/Separator';
import List from '/component/amp/List';

import {below} from '/util/css';

const CityItem = styled.div`
  color: #000000;
  font-size: 80px;
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
  ${below.phone`
    font-size: 34px;
  `}
`;

const Dates = styled.div`
  opacity: 0.5;
  color: #000000;
  font-size: 18px;
  line-height: 24px;
`;

const DateItem = styled.span`
  &:after {
    content: ' & ';
  }
  &:last-child:after {
    content: none;
  }
`;

const LocationIcon = styled(Icon)`
  margin-left: 20px;
  opacity: 0;
`;

const EmptyItem = styled.div`
  margin-top: 32px;
  &:first-child {
    margin-top: 0;
  }
`;

const LocationButton = styled((rest) => <button {...rest} />)`
  margin-top: 32px;
  display: block;
  text-align: left;
  &:first-child {
    margin-top: 0;
  }
  &:hover {
    cursor: pointer;
    > ${CityItem} {
      color: #4c2f9b;
      > ${LocationIcon} {
        opacity: 1;
      }
    }
  }
`;

class CityList extends React.Component {
  render() {
    const {empty, ...rest} = this.props;
    return (
      <PaddedContent v={4}>
        <List single-item="" items="." {...rest}>
          <Template type="amp-mustache">
            {empty && (
              <React.Fragment>
                <Template.Token id="^items" />
                {empty}
                <Template.Token id="/items" />
              </React.Fragment>
            )}

            <Template.Loop id="items">
              <LocationButton
                on={`
              tap:
              AMP.setState({
                ticketCount: 0,
                currentLocation: "{{id}}",
                currentLocationIndex: {{index}},
                currentShow: "{{shows.0.id}}"
              }),
              ${LocationPickerSidebar.id}.close,
              ${SeatPickerSidebar.id}.open
            `}
              >
                <CityItem>
                  <Template.Token id="city" />
                  <LocationIcon name="arrow-top-right" size="1.2em" />
                </CityItem>
                <Dates>
                  <Template.Token id="shows.length" /> date
                  <Template.Token id="^shows.length" />
                  s
                  <Template.Token id="/shows.length" />
                  <Template.Token id="#shows.1" />
                  s
                  <Template.Token id="/shows.1" /> •{' '}
                  <Template.Token id="#shows" />
                  <DateItem>
                    <Template.Token id="date" />
                  </DateItem>
                  <Template.Token id="/shows" />
                </Dates>
              </LocationButton>
            </Template.Loop>
          </Template>
        </List>
      </PaddedContent>
    );
  }
}

class NoLocations extends React.Component {
  render() {
    return (
      <EmptyItem>
        <CityItem>Select a date</CityItem>
        <Dates>
          No events
          <span data-amp-bind-text="selectedDate ? ' on ' + selectedDate : ''" />
          .
        </Dates>
      </EmptyItem>
    );
  }
}

class LocationPickerByDate extends React.Component {
  render() {
    return (
      <div>
        <PaddedContent h={7} v={4}>
          <DatePicker />
        </PaddedContent>
        <Separator />
        <PaddedContent h={7}>
          <CityList
            id="date-picker-city-list"
            layout="fixed-height"
            height="400"
            src="/api/cities.json"
            data-amp-bind-src="'/api/cities.json?date=' + selectedDate"
            empty={<NoLocations />}
          />
        </PaddedContent>
      </div>
    );
  }
}

class LocationPickerByCity extends React.Component {
  render() {
    return (
      <PaddedContent h={7}>
        <CityList id="main-city-list" src="/api/cities.json" />
      </PaddedContent>
    );
  }
}

const LocationPickerContainer = styled.div`
  display: flex;
  height: 100%;
  max-height: 100%;
  flex-direction: column;
`;

class LocationPickerSidebar extends React.Component {
  static id = 'sidebarLocationPicker';
  render() {
    const header = (
      <div>
        <Sidebar.DefaultHeader id={LocationPickerSidebar.id} />
        <PaddedContent h={7}>
          <TabPanel id="picker" align="left">
            <TabPanel.Tab big value="city" label="Cities" selected />
            <TabPanel.Tab big value="date" label="Dates" />
          </TabPanel>
        </PaddedContent>
      </div>
    );
    return (
      <Sidebar id={LocationPickerSidebar.id} header={header}>
        <LocationPickerContainer>
          <TabPanel.Portal id="picker">
            <TabPanel.Tab value="city">
              <LocationPickerByCity />
            </TabPanel.Tab>
            <TabPanel.Tab value="date">
              <LocationPickerByDate />
            </TabPanel.Tab>
          </TabPanel.Portal>
        </LocationPickerContainer>
      </Sidebar>
    );
  }
}

export default LocationPickerSidebar;
