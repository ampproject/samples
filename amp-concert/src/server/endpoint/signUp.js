import {compose} from 'midori';

import formData from '/server/selector/formData';
import ampAccessControl from '/server/util/ampAccessControl';
import loginAs from '/server/util/loginAs';
import ampRedirect from '/server/util/ampRedirect';
import json from '/server/util/json';

const signUp = compose(
  ampAccessControl,
  formData((params) => {
    const {email, name, returnUrl} = params;
    const user = {
      email,
      name,
    };
    return compose(
      loginAs(user),
      ampRedirect(returnUrl),
      json(200, {status: 'success'}),
    );
  }),
);

export default signUp;
