import {query, apply, compose} from 'midori';
import pluralize from 'pluralize';

import priceFormatter from '/server/selector/priceFormatter';
import ampAccessControl from '/server/util/ampAccessControl';
import json from '/server/util/json';

import {getLocationById, getShowById, getSeatsForShow} from '/server/data';

const purchaseSummary = compose(
  ampAccessControl,
  apply(priceFormatter, query, async (priceFormatter, query) => {
    if (!query.show) {
      return json(400, null);
    }
    const show = await getShowById(query.show);
    if (!show) {
      return json(400, null);
    }
    const location = await getLocationById(show.location);
    const {seats} = await getSeatsForShow(show.id);
    const wantSeats = (query.seats || '').split(',').map((x) => x.trim());
    const gotSeats = seats.filter((seat) => {
      return wantSeats.indexOf(seat.seat) !== -1;
    });
    let total = gotSeats.reduce((prev, cur) => {
      return prev + cur.price;
    }, 0);
    let floorTickets = parseInt(query.floorTickets, 10);
    if (Number.isNaN(floorTickets)) {
      floorTickets = 0;
    }
    total += floorTickets * show.floorPrice;
    const summary = `${gotSeats.length + floorTickets} ${pluralize(
      'seat',
      gotSeats.length,
    )}`;
    if (floorTickets > 0) {
      gotSeats.push({
        isFloor: true,
        price: floorTickets * show.floorPrice,
        notes: `${floorTickets} ${pluralize('ticket', floorTickets)}`,
      });
    }
    const data = {
      seats: gotSeats.map((seat) => {
        return {
          ...seat,
          price: priceFormatter.format(seat.price),
        };
      }),
      summary,
      total: priceFormatter.format(total),
      location,
      date: show.date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };
    return json(200, data);
  }),
);

export default purchaseSummary;
