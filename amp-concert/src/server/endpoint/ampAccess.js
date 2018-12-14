import {compose} from 'midori';

import currentUser from '/server/selector/currentUser';
import ampAccessControl from '/server/util/ampAccessControl';
import json from '/server/util/json';

/**
 * https://ampbyexample.com/components/amp-access/
 * Whatever is returned here becomes available in the AMP page to do any kind
 * of "auth" checked. e.g. things like `<div amp-access="loggedIn">...</div>`
 * reflects the value here.
 */
const ampAccess = compose(
  ampAccessControl,
  currentUser((user) => {
    if (user) {
      return json(200, {
        loggedIn: true,
        ...user,
      });
    }
    return json(200, {loggedIn: false});
  }),
);

export default ampAccess;
