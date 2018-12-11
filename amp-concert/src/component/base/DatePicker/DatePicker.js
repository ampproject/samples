import * as React from 'react';
import styled from 'styled-components';
import Config from '/component/context/Config';

const DatePickerWrapper = styled.div`
  margin-left: -32px;
  .DayPicker {
    background: transparent;
    border: none;
  }
  .CalendarMonth_caption {
    background-color: transparent;
    color: ${({theme}) => theme.colors.heartOfDarkness};
    width: 300px;
    > strong {
      font-weight: bold;
      font-size: 16px;
    }
  }

  .CalendarDay__today {
    background-color: rgba(0, 0, 0, 0.14);
  }

  .CalendarDay_container {
    border-radius: 50%;
    &:hover {
      background-color: rgba(0, 0, 0, 0.14);
      border: none;
    }
  }

  .CalendarDay_container.CalendarDay__selected {
    border: none;
    background-color: ${({theme}) => theme.colors.datPurp};
    border-radius: 50%;
    &.CalendarDay__highlighted_calendar,
    &.CalendarDay__highlighted_calendar:hover {
      border: none;
      background-image: radial-gradient(
        circle at 50% 82%,
        #fff 0px,
        #fff 2px,
        transparent 3px,
        transparent 100%
      );
    }
  }

  .CalendarDay__highlighted_calendar,
  .CalendarDay__highlighted_calendar:hover {
    background-image: radial-gradient(
      circle at 50% 82%,
      ${({theme}) => theme.colors.datPurp} 0px,
      ${({theme}) => theme.colors.datPurp} 2px,
      transparent 3px,
      transparent 100%
    );
  }



  .DayPickerNavigation_button {
    background-size: contain;
  }

  .DayPickerNavigation_leftButton__horizontal {
    left: 24px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='${({
      theme,
    }) =>
      theme.colors
        .datPurp}' d='M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z'/%3E%3C/svg%3E");
  }

  .DayPickerNavigation_rightButton__horizontal {
    right: auto;
    left: 232px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill='${({
      theme,
    }) =>
      theme.colors
        .datPurp}' d='M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42z'/%3E%3C/svg%3E");
  }

  .DayPickerKeyboardShortcuts_buttonReset {
    display: none;
  }
`;

class DatePicker extends React.Component {
  render() {
    return (
      <Config.Consumer>
        {({webUrl}) => (
          <DatePickerWrapper>
            <amp-date-picker
              id="static-picker"
              type="single"
              mode="static"
              layout="fixed-height"
              height="360"
              format="YYYY-MM-DD"
              input-selector="#static-picker-input"
              src={`${webUrl}/api/dates.json`}
              day-size="50"
              on="select:AMP.setState({selectedDate: event.date})"
            >
              <input type="hidden" id="static-picker-input" />
            </amp-date-picker>
          </DatePickerWrapper>
        )}
      </Config.Consumer>
    );
  }
}

export default DatePicker;
