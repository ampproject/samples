/* eslint-disable no-console */
import validatorFactory from 'amphtml-validator';
import render from '/server/render';

const validate = async () => {
  const validator = await validatorFactory.getInstance();
  const pages = [
    {
      path: '/',
      locale: 'en-US',
    },
  ];
  let hasErrors = false;

  for (const config of pages) {
    const {markup} = await render(config);
    const result = validator.validateString(markup);
    if (result.status !== 'PASS') {
      hasErrors = true;
      console.log('====== INVALID MARKUP ======');
      console.log(markup);
      console.log('====== INVALID MARKUP ======');
    }
    (result.status === 'PASS' ? console.log : console.error)(result.status);
    for (let ii = 0; ii < result.errors.length; ii++) {
      const error = result.errors[ii];
      let msg = `line ${error.line}, col ${error.col}: ${error.message}`;
      if (error.specUrl !== null) {
        msg += ` (see  ${error.specUrl} )`;
      }
      (error.severity === 'ERROR' ? console.error : console.warn)(msg);
    }
  }
  if (hasErrors) {
    process.exit(-1);
  }
  // HACK: FIXME: Something is stealing the eventloop
  process.exit(0);
};

validate();
