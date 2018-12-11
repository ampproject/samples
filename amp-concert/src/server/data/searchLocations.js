import Fuse from 'fuse.js';
import parseDate from './parseDate';

import getLocations from './getLocations';
import getShows from './getShows';

const fuseOptions = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 10,
  maxPatternLength: 32,
  minMatchCharLength: 2,
  keys: ['city', 'administrative', 'country'],
};

let locationsIndex;
let locations = [];

const refresh = async () => {
  locations = await getLocations();
  const shows = await getShows();
  for (const location of locations) {
    location.shows = shows.filter(({location: id}) => id === location.id);
  }
  locationsIndex = new Fuse(locations, fuseOptions);
};

if (process.env.NODE_ENV !== 'test') {
  setInterval(refresh, 20000);
  refresh();
}

const searchLocations = async (params) => {
  if (!locationsIndex) {
    return [];
  }
  let results = params.query ? locationsIndex.search(params.query) : locations;
  results = results || [];
  if (params.date) {
    const d1 = parseDate(params.date);
    results = results.map((result) => {
      return {
        ...result,
        shows: result.shows.filter((show) => {
          const d2 = show.date;
          return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
          );
        }),
      };
    });
  }

  results = results.filter(({shows}) => shows.length > 0);
  return results;
};

export default searchLocations;
