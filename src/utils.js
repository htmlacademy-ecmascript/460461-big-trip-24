export const capitalizeFirstLetter = (str) => {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// SEP 09
export const getShortDate = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
// 2024-09-09T21:11:17.324Z
export const getDateISO = (date) => date.toISOString();
// 10:30
export const getDateTime = (date) => date.toTimeString().slice(0, 5);
// 19/03/19 00:00
export const getFormattedDate = (date) =>
  date.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', '').replace(/\//g, '/');
