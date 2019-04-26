import {query, apply} from 'midori';
import {
  getShowById,
  getShowsForLocation,
  getLocationById,
  getSeatsForShow,
} from '/server/data';

import priceFormatter from '/server/selector/priceFormatter';
import json from '/server/util/json';

const show = apply(priceFormatter, query, async (priceFormatter, params) => {
  if (!params.id) {
    return json(400, null);
  }
  const show = await getShowById(params.id);
  if (show) {
    const location = await getLocationById(show.location);
    const shows = await getShowsForLocation(location.id);
    const {seats} = await getSeatsForShow(show.id);

    const newShows = shows.map((item) => {
      return {
        ...item,
        selected: item.id === show.id,
        date: item.date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
      };
    });
    const newShow = {
      ...show,
      totalSeats: seats.length,
      basePrice: Math.min(...seats.map(({price}) => price)),
      formattedFloorPrice: priceFormatter.format(show.floorPrice),
      location: {
        ...location,
        shows: newShows,
      },
    };
    return json(200, newShow);
  }
  return json(404, null);
});

export default show;
