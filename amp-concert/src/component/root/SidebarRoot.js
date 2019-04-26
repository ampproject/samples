// Import modules ==============================================================
import * as React from 'react';
import {ThemeProvider} from 'styled-components';

import SeatPickerSidebar from '/component/sidebar/SeatPickerSidebar';
import LocationPickerSidebar from '/component/sidebar/LocationPickerSidebar';
import ReviewsSidebar from '/component/sidebar/ReviewsSidebar';
import AccountSidebar from '/component/sidebar/AccountSidebar';
import PurchaseSummarySidebar from '/component/sidebar/PurchaseSummarySidebar';
import PaymentSidebar from '/component/sidebar/PaymentSidebar';
import MobileNavSidebar from '/component/sidebar/MobileNavSidebar';

import theme from '/theme';

class SidebarRoot extends React.Component {
  render() {
    const {reviews} = this.props;
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <MobileNavSidebar />
          <AccountSidebar />
          <PaymentSidebar />
          <PurchaseSummarySidebar />
          <SeatPickerSidebar />
          <LocationPickerSidebar />
          <ReviewsSidebar reviews={reviews} />
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default SidebarRoot;
