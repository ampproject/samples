import * as React from 'react';
import styled from 'styled-components';

import SpacedContent from '/component/base/SpacedContent';
import Template from '/component/amp/Template';
import Loader from '/component/base/Loader';

const SeatTile = styled((props) => <div {...props} />)`
  height: 20px;
  width: 20px;
  border: 1px solid #848484;
  background: #fff;
  display: inline-block;
  &[data-blank='true'] {
    background-color: transparent;
    border-color: transparent;
  }
  &[data-disabled='true'] {
    background-color: #848484;
    border-color: transparent;
  }
  &[data-selected] {
    background-color: #ff0056;
    border-color: transparent;
  }
`;

const SeatTileRect = styled((props) => <rect {...props} />)`
  stroke-width: 1px;
  stroke: #848484;
  fill: #fff;
  display: inline-block;
  &[data-disabled='true'] {
    fill: #848484;
    stroke: transparent;
  }
  &:focus {
    outline: none;
  }
  &[selected][option] {
    outline: none;
    fill: #ff0056;
    stroke: transparent;
  }
`;

const SeatLegendContainer = styled.div`
  display: flex;
`;

const SeatLegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
  > ${SeatTile} {
    margin-right: 8px;
  }
`;

const SeatTileLabel = styled.text`
  opacity: 0.5;
  color: #000000;
  font-family: Poppins;
  font-size: 14px;
  letter-spacing: -0.15px;
  line-height: 25px;
  text-align: center;
  text-anchor: middle;
`;

const ListContainer = styled.div`
  position: relative;
  height: 50vh;
  min-width: 100%;
  box-sizing: border-box;
`;

export default class SeatLayoutPicker extends React.Component {
  render() {
    return (
      <SpacedContent f={2}>
        <SeatLegendContainer>
          <SeatLegendItem>
            <SeatTile data-disabled /> Taken / Not available
          </SeatLegendItem>
          <SeatLegendItem>
            <SeatTile /> Available
          </SeatLegendItem>
          <SeatLegendItem>
            <SeatTile data-selected /> Selected
          </SeatLegendItem>
        </SeatLegendContainer>
        <ListContainer>
          <amp-state
            id="currentSeatsObject"
            src="/api/seats.json"
            data-amp-bind-src="'/api/seats.json?show=' + currentShow"
          />
          <amp-list
            id="seat-layout"
            layout="fill"
            src="/api/seats.json"
            data-amp-bind-src="'/api/seats.json?show=' + currentShow"
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
              <amp-pan-zoom
                layout="fill"
                style={{
                  maxWidth: '{{width}}px',
                  maxHeight: '{{height}}px',
                }}
              >
                <amp-selector
                  layout="fill"
                  multiple=""
                  data-amp-bind-selected="internalCurrentSeats"
                  on={`select:AMP.setState({
                      floorTickets: 0,
                      internalCurrentSeats: event.selectedOptions,
                      currentSeats: event.selectedOptions.join(','),
                      ticketCount: event.selectedOptions.length,
                      totalPrice: event.selectedOptions.reduce((prev, cur) => (prev + currentSeatsObject.seats[currentSeatsObject.index[cur]].price), 0)
                    })
                  `}
                >
                  <svg
                    preserveAspectRatio="xMidYMin slice"
                    viewBox="{{viewBox}}"
                  >
                    <Template.Token id="#labels" />
                    <SeatTileLabel x="{{x}}" y="{{y}}" dy="-0.4em">
                      <Template.Token id="label" />
                    </SeatTileLabel>
                    <Template.Token id="/labels" />
                    <Template.Token id="#seats" />
                    <Template.Token id="#occupied" />
                    <SeatTileRect
                      data-disabled="true"
                      x="{{x}}"
                      y="{{y}}"
                      width="{{width}}"
                      height="{{height}}"
                      rx="{{rx}}"
                      ry="{{ry}}"
                    />
                    <Template.Token id="/occupied" />
                    <Template.Token id="^occupied" />
                    <SeatTileRect
                      option="{{seat}}"
                      role="button"
                      tabIndex="0"
                      x="{{x}}"
                      y="{{y}}"
                      width="{{width}}"
                      height="{{height}}"
                      rx="{{rx}}"
                      ry="{{ry}}"
                    />
                    <Template.Token id="/occupied" />

                    <Template.Token id="/seats" />
                  </svg>
                </amp-selector>
              </amp-pan-zoom>
            </Template>
          </amp-list>
        </ListContainer>
      </SpacedContent>
    );
  }
}
