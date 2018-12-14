import {next} from 'midori';
import jwt from 'jsonwebtoken';
import cookies from '/server/selector/cookies';

/**
 * Login as a given user. Nothing fancy, just a JWT stored in a cookie.
 * @param {Object} user User object to use for login. See `getUserByEmail`.
 * @returns {App} Midori app.
 */
const loginAs = (user) =>
  cookies((cookies) => {
    const payload = {
      user: {
        ...user,
        initial: (user.name || 'P').charAt(0),
      },
    };
    const data = jwt.sign(payload, 'secret');
    cookies.set('jwt', data);
    return next;
  });

export default loginAs;
