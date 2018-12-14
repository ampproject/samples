import {request} from 'midori';
import {getShows} from '/server/data';
import json from '/server/util/json';

const dates = request(async () => {
  const shows = await getShows();
  return json(200, {
    templates: [],
    highlighted: shows.map(({date}) => {
      return date.getTime();
    }),
  });
});

export default dates;
