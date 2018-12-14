import {apply, redirect, query} from 'midori';

import cookies from '/server/selector/cookies';

const logout = apply(query, cookies, (params, cookies) => {
  const returnUrl = params.return;
  cookies.set('jwt', null);
  return redirect(returnUrl);
});

export default logout;
