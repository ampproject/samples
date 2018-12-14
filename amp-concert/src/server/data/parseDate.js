import getTimezoneOffset from 'get-timezone-offset';

/**
 * Hello again old friend. The monster is designed to parse garbage dates put
 * in by the user. Things like `new Date('2019-01-01')` are no go because the
 * implicit timezone (UTC) is all kinds of wrong most of the time. Sooooooooo
 * we do some dark magic and inject an arbitrary (but best) timezone for the
 * west coast. Note that `new Date('garbage')` will also still return a date,
 * just it won't work. We also deal with that edge case.
 * @param {String} inVal Something like a date.
 * @returns {Date} The parsed data.
 */
const parseDate = (inVal) => {
  let val = inVal;
  const hasTZ = !!/(Z|[+-][0-9]{2}:[0-9]{2})$/.exec(val);
  if (!hasTZ) {
    const tzOffset = -1 * getTimezoneOffset('America/Los_Angeles', new Date());
    const hours = Math.floor(Math.abs(tzOffset) / 60)
      .toString()
      .padStart(2, '0');
    const mins = (Math.abs(tzOffset) % 60).toString().padStart(2, '0');
    const sign = tzOffset < 0 ? '-' : '+';
    val = `${val} GMT${sign}${hours}${mins}`;
  }
  const date = new Date(val);
  if (Number.isNaN(date.getTime())) {
    return false;
  }
  return date;
};

export default parseDate;
