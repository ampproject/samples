import getWorksheetData from './getWorksheetData';
import getShowById from './getShowById';
import parsePrice from './parsePrice';

const getRawSeats = async (id) => {
  const data = await getWorksheetData('seats');
  return data
    .filter((item) => {
      return item.id && item.seat && item.price;
    })
    .filter(({id: target}) => {
      return `${target}` === `${id}`;
    });
};

const getSeatsForShow = async (id) => {
  const show = await getShowById(id);
  if (!show) {
    return null;
  }
  const data = await getRawSeats(show.seatListId);
  const seatData = data.map(({seat, occupied, price, notes}) => {
    const [row] = /^[^0-9]+/.exec(seat);
    const [column] = /[0-9]+$/.exec(seat);
    return {
      notes,
      seat,
      row,
      column: parseInt(column, 10),
      occupied: occupied.toLowerCase() === 'yes',
      price: parsePrice(price),
    };
  });
  const getOffsetAxis = (type, index) => {
    const items = show.seatingAisles.filter((item) => {
      return item.type === type && item.index < index + 1;
    });
    return items.length * 6;
  };
  const out = [];
  const labels = [];
  const size = 20;
  const padding = 3;
  const labelOffset = size + padding * 2;

  for (let rowOffset = 0; rowOffset < show.seatingGrid.rows; ++rowOffset) {
    const row = String.fromCharCode(65 + rowOffset);
    labels.push({
      x: 6,
      y:
        rowOffset * (size + padding) +
        getOffsetAxis('row', rowOffset) +
        labelOffset +
        size,
      label: row,
    });
  }
  for (let column = 0; column < show.seatingGrid.columns; ++column) {
    labels.push({
      x:
        column * (size + padding) +
        getOffsetAxis('column', column) +
        labelOffset +
        size / 2,
      y: size,
      label: (column + 1).toString(),
    });
  }

  for (let rowOffset = 0; rowOffset < show.seatingGrid.rows; ++rowOffset) {
    for (let column = 0; column < show.seatingGrid.columns; ++column) {
      const row = String.fromCharCode(65 + rowOffset);
      const entry = seatData.find(
        ({row: r, column: c}) => row === r && column + 1 === c,
      );
      if (entry) {
        out.push({
          ...entry,
          x:
            labelOffset +
            column * (size + padding) +
            getOffsetAxis('column', column),
          y:
            labelOffset +
            rowOffset * (size + padding) +
            getOffsetAxis('row', rowOffset),
          rx: 2,
          ry: 2,
          width: size,
          height: size,
        });
      }
    }
  }

  let maxWidth = 0;
  let maxHeight = 0;

  out.forEach(({x, y, width, height}) => {
    maxWidth = Math.max(maxWidth, x + width);
    maxHeight = Math.max(maxHeight, y + height);
  });

  return {
    // HACK: Width increase here is for amp-pan-zoom so that it shoves
    // the [+] button out of reach of the seats
    width: maxWidth + 20,
    height: maxHeight,
    viewBox: `0 0 ${maxWidth} ${maxHeight}`,
    seats: out,
    labels,
  };
};

export default getSeatsForShow;
