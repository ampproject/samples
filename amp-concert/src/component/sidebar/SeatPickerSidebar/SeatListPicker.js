import * as React from 'react';
import styled from 'styled-components';

import SpacedContent from '/component/base/SpacedContent';
import Template from '/component/amp/Template';
import Icon from '/component/base/Icon';
import List from '/component/amp/List';

const SeatCheckbox = styled.div`
  height: 22px;
  width: 22px;
  border: 2px solid #000000;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24px;
  > * {
    color: #fff;
    display: none;
  }
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
  &:focus {
    outline: none;
  }
  &[option][selected] {
    outline: none;
  }
  &[selected] > ${SeatCheckbox} {
    background-color: #ff0056;
    border-color: #ff0056;
    > * {
      display: block;
    }
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
  font-family: Poppins;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  text-align: right;
`;

export default class SeatListPicker extends React.Component {
  render() {
    return (
      <SpacedContent f={2}>
        <amp-state
          id="currentSeatsObject"
          src="/api/seats.json"
          data-amp-bind-src="'/api/seats.json?show=' + currentShow"
        />
        <List
          id="seat-layout"
          src="/api/seats.json"
          data-amp-bind-src="'/api/seats.json?show=' + currentShow"
          single-item=""
          items="."
        >
          <Template type="amp-mustache">
            <amp-selector
              multiple=""
              data-amp-bind-selected="internalCurrentSeats"
              on={`select:AMP.setState({
                floorTickets: 0,
                internalCurrentSeats: event.selectedOptions,
                currentSeats: event.selectedOptions.join(','),
                ticketCount: event.selectedOptions.length,
                totalPrice: event.selectedOptions.reduce((prev, cur) => (prev + currentSeatsObject.seats[currentSeatsObject.index[cur]].price), 0)
              })`}
            >
              <Template.Loop id="seats">
                <SeatContainer role="button" tabIndex="0" option="{{seat}}">
                  <SeatCheckbox>
                    <Icon name="check" />
                  </SeatCheckbox>
                  <SeatMain>
                    <SeatInfo>
                      Section <Template.Token id="column" /> Row{' '}
                      <Template.Token id="row" />
                    </SeatInfo>
                    <SeatNotes>
                      <Template.Token id="notes" />
                    </SeatNotes>
                  </SeatMain>
                  <SeatPrice>
                    <Template.Token id="formattedPrice" />
                    /unit
                  </SeatPrice>
                </SeatContainer>
              </Template.Loop>
            </amp-selector>
          </Template>
        </List>
      </SpacedContent>
    );
  }
}
