/**
 * Smash and grab job. Basically just strips out things humans like to shove
 * alongside prices (i.e. `$`).
 * @param {String} val Input.
 * @returns {Number} Parsed result.
 */
const parsePrice = (val) => parseFloat(val.replace(/[^0-9.-]/g, ''));

export default parsePrice;
