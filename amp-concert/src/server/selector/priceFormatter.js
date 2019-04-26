import {createSelector, request} from 'midori';

/**
 * Format a price. Maybe one day this will be made locale aware using something
 * like negotiator.
 */
export default createSelector(
  request,
  (_req) => {
    // TODO: Detect current locale and format based on that.
    const priceFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
    return priceFormatter;
  },
);
