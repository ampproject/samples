import {compose, request, send} from 'midori';

import ampAccessControl from '/server/util/ampAccessControl';

/**
 * Ye ol rando ping.
 * https://ampbyexample.com/components/amp-access/
 */
const ampPing = compose(
  ampAccessControl,
  request(() => {
    // TODO: Add whatever kind of click tracking here if needed.
    return send(200, '');
  }),
);

export default ampPing;
