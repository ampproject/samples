import {compose, request} from 'midori';

import ampAccessControl from '/server/util/ampAccessControl';
import json from '/server/util/json';

import {getPurchaseHistory} from '/server/data';

const tickets = compose(
  ampAccessControl,
  request(async () => {
    const items = await getPurchaseHistory();
    return json(200, {
      items,
    });
  }),
);

export default tickets;
