import {createSelector} from 'midori';
import jwt from 'jsonwebtoken';

import cookies from './cookies';

/**
 * Get the current user of the request. User can be set with `loginAs`.
 */
const currentUser = createSelector(
  cookies,
  (cookies) => {
    try {
      const {user} = jwt.verify(cookies.get('jwt'), 'secret');
      return user;
    } catch (err) {
      return null;
    }
  },
);

export default currentUser;
