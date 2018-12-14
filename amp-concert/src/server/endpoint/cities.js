import {apply, query} from 'midori';

import {searchLocations} from '/server/data';
import json from '/server/util/json';

const cities = apply(query, async (params) => {
  const locations = await searchLocations(params);
  return json(200, {
    items: locations.map((item, index) => {
      return {
        ...item,
        index,
        shows: item.shows.map((show, index) => {
          return {
            id: show.id,
            floorPrice: show.floorPrice,
            totalSeats: show.totalSeats,
            basePrice: show.basePrice,
            index,
            // https://github.com/ampproject/amphtml/issues/10837
            date: show.date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            }),
          };
        }),
      };
    }),
  });
});

export default cities;
