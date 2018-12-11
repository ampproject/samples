import {clientIp, createSelector} from 'midori';
import geoip from 'geoip-country';

/**
 * Get the country of the current request. Used for server-side AMP-geo
 * monkey business.
 */
const country = createSelector(
  clientIp,
  (ip) => {
    const result = geoip.lookup(ip);
    if (result) {
      return result.country.toLowerCase();
    }
    return null;
  },
);

export default country;
