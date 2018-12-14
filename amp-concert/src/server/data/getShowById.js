import getShows from './getShows';

const getShowById = async (id) => {
  const realId = `${id}`;
  const shows = await getShows();
  return shows.find(({id}) => `${id}` === `${realId}`);
};

export default getShowById;
