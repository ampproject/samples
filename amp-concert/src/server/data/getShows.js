import getWorksheetData from './getWorksheetData';
import parseDate from './parseDate';
import parsePrice from './parsePrice';

const getShows = async () => {
  const data = await getWorksheetData('shows');
  const shows = data
    .filter((item) => {
      if (
        !item.id ||
        !item.location ||
        !item.seatinggrid ||
        !item.floorprice ||
        !item.seatlistid
      ) {
        return false;
      }
      if (!parseDate(item.date)) {
        return false;
      }
      return true;
    })
    .map(
      ({
        id,
        location,
        date,
        seatinggrid,
        floorprice,
        seatingaisles,
        seatlistid,
      }) => {
        const [columns, rows] = seatinggrid
          .split('x', 2)
          .map((x) => parseInt(x, 10));
        return {
          id,
          location,
          seatListId: parseInt(seatlistid, 10),
          date: parseDate(date),
          seatingGrid: {rows, columns},
          floorPrice: parsePrice(floorprice),
          seatingAisles: seatingaisles
            .split(',')
            .map((x) => x.trim())
            .sort()
            .map((x) => {
              if (/^[0-9]+/.exec(x)) {
                return {
                  type: 'column',
                  index: parseInt(x, 10),
                };
              }
              return {
                type: 'row',
                index: x.charCodeAt(0) - 65,
              };
            }),
        };
      },
    );

  return shows;
};

export default getShows;
