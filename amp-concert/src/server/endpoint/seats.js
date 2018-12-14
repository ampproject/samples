import {query, apply} from 'midori';
import {getSeatsForShow} from '/server/data';

import priceFormatter from '/server/selector/priceFormatter';
import json from '/server/util/json';

const seats = apply(priceFormatter, query, async (priceFormatter, params) => {
  if (!params.show) {
    return json(400, null);
  }
  const seats = await getSeatsForShow(params.show);
  if (!seats) {
    return json(404, null);
  }
  const index = {};
  seats.seats.forEach((seat, i) => {
    seat.formattedPrice = priceFormatter.format(seat.price);
    index[seat.seat] = i;
  });
  seats.index = index;
  return json(200, seats);
});

export default seats;
