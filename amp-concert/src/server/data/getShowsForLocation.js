import getShows from './getShows';

const getShowsForLocation = async (location) => {
  const shows = await getShows();
  return shows.filter(({location: id}) => id === location);
};

export default getShowsForLocation;
