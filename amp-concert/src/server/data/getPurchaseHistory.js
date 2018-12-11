import getWorksheetData from './getWorksheetData';

const getPurchaseHistory = async () => {
  const data = await getWorksheetData('history');
  return data
    .filter((item) => {
      return item.date && item.city && item.summary && item.url;
    })
    .map((item) => {
      return {
        past: (item.past || '').toLowerCase() === 'yes',
        date: item.date,
        city: item.city,
        summary: item.summary,
        url: item.url,
      };
    });
};

export default getPurchaseHistory;
