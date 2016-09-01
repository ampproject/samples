/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

const express = require('express');
const oauthClientsModel = require('../../models/oauth-clients');
const userModel = require('../../models/user');
const crypto = require('crypto');
const router = express.Router(); 
const idTokenVerifier = require('./idtoken-verifier');
const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;

function encrypt(input, secret) {
  // TODO Implement preper encryption
  return input;
}

function generateAuthCode(oAuthClient, user, scope) {
  const authCode = {
    type: "code",
    id: user.username,
    scope: scope,
    expires_at: new Date() + ONE_MINUTE
  }
  return encrypt(JSON.stringify(authCode), oAuthClient.secret);
}

function generateIdToken(user, host) {
    const idToken = {
      iss: host, // TODO Choose a Partner Domain!!
      aud: 'https://www.google.com',
      iat: new Date(),
      exp: new Date() + ONE_HOUR,
      sub: user.email,
      name: user.name
    }

    return encodeBase64("{\"alg\":\"none\",\"typ\":\"JWT\"}")
      + "."
      + encodeBase64(JSON.stringify(idToken))
      + ".";
}

function encodeBase64(input) {
  return new Buffer(input).toString('base64');
}

router.get('/authorize', (request, response) => {
  if (!request.cookies.email) {
    response.redirect('/amp-access/login?return=/oauth/authorize');
  }
  const session = request.session;
  session.signInRequest = {
        clientId: request.query.client_id,
        redirectUrl: request.query.redirect_url,
        state: request.query.state,
        scope: request.query.scope,
        responseType: request.query.response_type    
  };

  response.render('oauth-server/login', {
    returnUrl: '',
    readerId: ''
  });  
});

router.post('/authorize', (request, response, next) => {
  const signInRequest = request.session.signInRequest;
  const oAuthClient = oauthClientsModel.findByKey(signInRequest.clientId);
  if (!oAuthClient) {
    next('Unknown clientId');
    return;
  }

  const user = userModel.findByEmail(request.cookies.email);
  if (!user) {
    next('User not logged in');
    return;
  }
  const authCode = generateAuthCode(oAuthClient, user, signInRequest.scope);
  const idToken = generateIdToken(user, request.get('host'));

  response.redirect("https://oauth-redirect.googleusercontent.com/_/redirect?" +
          "code=" + authCode +
          "&id_token=" + idToken +
          "&state=" + signInRequest.state);
});

router.post('/token', (request, response, next) => {
  const clientId = request.body.client_id;
  const clientSecret = request.body.client_secret;
  const oAuthClient = oauthClientsModel.findByKeyAndSecret(clientId, clientSecret);  
  if (!oAuthClient) {
    next('Unknown client_id or wrong client_secret');
  }

  const grantType = request.body.grant_type;
  switch(grantType) {
    case "urn:ietf:params:oauth:grant-type:jwt-bearer":
      doAutoSignInOrUp(oAuthClient, request, response);
      break;
    case "authorization_code":
      doAuthorizationCode(oAuthClient, request, response);
      break;
    case "refresh_token":
      doRefreshToken(oAuthClient, request, response);
      break;
    default: 
      next('Unsupported grant_type: ' + grantType);
  }  
});

function doAutoSignInOrUp(oAuthClient, request, response) {
  const scope = request.getParameter("scope");
  const assertion = request.getParameter("assertion");

  const googleIdToken = idTokenVerifier.verify(assertion);
  const userEmail = googleIdToken.email;
  const userId = googleIdToken.sub;
  
  let user = userModel.findByEmail(userEmail);
  if (!user) {
    userModel.addUser(userEmail, userId);
  }

  const authCode = generateAuthCode(oAuthClient, user, scope);
  const idToken = generateIdToken(user, request.get('host'));

  const respContent = {
    authorization_code: authCode,
    id_token: idToken
  }

  response.json(respContent);
}

function doAuthorizationCode(oAuthClient, request, response) {
  const responseType = request.getParameter("response_type"); // Should be always `token`
  const code = request.getParameter("code");
}

function doRefreshToken(oAuthClient, request, response) {
  const responseType = request.body.response_type;
  const refreshToken = request.body.refresh_token;  
}

module.exports = router;