import * as React from 'react';
import styled from 'styled-components';

import SpacedContent from '/component/base/SpacedContent';

import SectionLabel from './SectionLabel';

import {below} from '/util/css';

const FloorDetails = styled.div`
  opacity: 0.5;
  color: #000000;
  font-size: 16px;
  line-height: 25px;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.div`
  color: #000000;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
`;

const LabelContents = styled.div`
  flex: auto;
`;

const Price = styled.div`
  color: #4c2f9b;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
`;

const SelectWrapper = styled.div`
  height: 50px;
  display: inline-flex;
  flex: auto;
  height: 50px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    right: 12px;
    top: 0;
    bottom: 0;
    width: 20px;
    background-size: contain;
    background-position: center center;
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z' /%3E%3C/svg%3E");
    background-repeat: no-repeat;
    pointer-events: none;
  }
`;
const Select = styled((props) => <select {...props} />)`
  width: 100%;
  height: 100%;
  flex: auto;
  color: #4c2f9b;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  border: 1px solid #4c2f9b;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  min-width: 305px;
  padding: 0 24px;
  ${below.phone`
    min-width: 0;
  `}
`;

export default class FloorPicker extends React.Component {
  render() {
    return (
      <SpacedContent f={4}>
        <div>
          <SectionLabel>Floor Tickets</SectionLabel>
          <FloorDetails>
            Floor tickets are standing-room-only in front of the stage. With no
            assigned seats, the area is first come, first serve.
          </FloorDetails>
        </div>
        <LabelContainer>
          <LabelContents>
            <Label>Select ticket number</Label>
            <Price>
              <span data-amp-bind-text="currentShowObject.formattedFloorPrice" />
              /unit
            </Price>
          </LabelContents>
          <SelectWrapper>
            <Select
              on={`change:AMP.setState({
                  floorTickets: event.value * 1,
                  currentSeats: '',
                  ticketCount: event.value * 1,
                  totalPrice: event.value * currentShowObject.floorPrice
                })
              `}
            >
              <option
                value="1"
                data-amp-bind-selected="floorTickets == 1 ? 'selected' : false"
              >
                1 ticket
              </option>
              <option
                value="2"
                data-amp-bind-selected="floorTickets == 2 ? 'selected' : false"
              >
                2 tickets
              </option>
              <option
                value="3"
                data-amp-bind-selected="floorTickets == 3 ? 'selected' : false"
              >
                3 tickets
              </option>
              <option
                value="4"
                data-amp-bind-selected="floorTickets == 4 ? 'selected' : false"
              >
                4 tickets
              </option>
              <option
                value="5"
                data-amp-bind-selected="floorTickets == 5 ? 'selected' : false"
              >
                5 tickets
              </option>
            </Select>
          </SelectWrapper>
        </LabelContainer>
      </SpacedContent>
    );
  }
}
