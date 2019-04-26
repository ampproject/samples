/* eslint-disable no-use-before-define */
import GoogleSpreadsheet from 'google-spreadsheet';
import doAsync from 'doasync';

const data = {};

const getDoc = async () => {
  if (data.doc) {
    return data.doc;
  }
  const doc = doAsync(
    new GoogleSpreadsheet('1cL9I5PLrINPD7eLrNAPqD69NcavypxWhRmHI4SE6318'),
  );
  data.doc = doc;
  return doc;
};

const getWorksheets = async () => {
  if (data._worksheets) {
    return data._worksheets;
  }
  const doc = await getDoc();
  const info = await doc.getInfo();
  const worksheets = info.worksheets.map((sheet) => doAsync(sheet));
  const index = {};
  worksheets.forEach((sheet) => {
    index[sheet.title.toLowerCase()] = sheet;
  });
  data._worksheets = index;
  return index;
};

const getWorksheetData = async (id) => {
  if (data[id] && Date.now() - data[id].lastUpdated < 1000 * 60 * 5) {
    return data[id].rows;
  }
  const worksheets = await getWorksheets();
  const rows = await worksheets[id].getRows({
    offset: 1,
    limit: 250,
  });
  data[id] = {
    lastUpdated: Date.now(),
    rows,
  };
  return rows;
};

export default getWorksheetData;
