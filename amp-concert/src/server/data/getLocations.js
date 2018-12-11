import getWorksheetData from './getWorksheetData';

const getLocations = async () => {
  const data = await getWorksheetData('locations');
  return data
    .map(({id, city, administrative, country, venue, address}) => {
      return {
        id,
        city,
        administrative,
        country,
        venue,
        address,
      };
    })
    .sort((a, b) => {
      if (a.city < b.city) return -1;
      if (a.city > b.city) return 1;
      return 0;
    });
};

export default getLocations;
