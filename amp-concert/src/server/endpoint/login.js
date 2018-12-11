import {compose} from 'midori';

import formData from '/server/selector/formData';
import ampAccessControl from '/server/util/ampAccessControl';
import ampRedirect from '/server/util/ampRedirect';
import json from '/server/util/json';
import loginAs from '/server/util/loginAs';

import {getUserByEmail} from '/server/data';

const login = compose(
  ampAccessControl,
  formData(async (params) => {
    const {email, password, returnUrl} = params;
    const user = await getUserByEmail(email);
    if (user && user.password === password) {
      return compose(
        loginAs(user),
        ampRedirect(returnUrl),
        json(200, {status: 'success'}),
      );
    }
    return json(400, {message: 'fail'});
  }),
);

export default login;
