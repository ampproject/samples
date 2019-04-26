import {send} from 'midori';

/**
 * Send a JSON blob back with a given status code.
 * @param {Number} status The code.
 * @param {Object} data The data.
 * @returns {App} Midori app.
 */
const json = (status, data) =>
  send(status, {'Content-Type': 'application/json'}, JSON.stringify(data));

export default json;
