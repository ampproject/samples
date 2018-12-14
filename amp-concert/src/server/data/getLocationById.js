import getLocations from './getLocations';

const getLocationById = async (id) => {
  const locations = await getLocations();
  return locations.find(({id: target}) => target === id);
};

export default getLocationById;
