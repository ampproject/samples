import {compose, apply} from 'midori';

import currentUser from '/server/selector/currentUser';
import formData from '/server/selector/formData';
import ampAccessControl from '/server/util/ampAccessControl';
import json from '/server/util/json';

import {submitReview} from '/server/data';

export default compose(
  ampAccessControl,
  apply(formData, currentUser, async (data, user) => {
    if (user) {
      await submitReview(data, {user});
      return json(200, {status: 'success'});
    }
    return json(401, {message: 'Please log in!'});
  }),
);
