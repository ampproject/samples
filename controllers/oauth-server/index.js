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
const router = express.Router(); 
const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;

function encrypt(input, secret) {
  // TODO Implement preper encryption
  return input;
}

function generateAuthCode(oauthClient, user, scope) {
  const authCode = {
    type: "code",
    id: user.username,
    scope: scope,
    expires_at: new Date() + ONE_MINUTE
  }
  return encrypt(JSON.stringify(authCode), oAuthClient.secret);
}

function generateIdToken(user) {
    const idToken = {
      iss: req.get('host'), // TODO Choose a Partner Domain!!
      aud: 'https://www.google.com',
      iat: new Date(),
      exp: new Date() + ONE_HOUR,
      sub: user.username,
      name: user.name
    }

    return encodeBase64("{\"alg\":\"none\",\"typ\":\"JWT\"}")
      + "."
      + encodeBase64(JSON.stringify(authCode))
      + ".";
}

router.get('/signin', (request, response) => {
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

router.post('/signin', (request, response, next) => {
  const signInRequest = request.session.signInRequest;
  const oAuthClient = oauthClientsModel.findByKey(signInRequest.clientId);
  if (!oAuthClient) {
    next('Unknown clientId');
    return;
  }

  const authCode = OAuthUtils.generateAuthCode(oAuthClient, user, signinRequest.getScope()); //TODO Add proper User
  const idToken = OAuthUtils.generateIdToken(user);

  response.redirect("https://oauth-redirect.googleusercontent.com/_/redirect?" +
          "code=" + authCode +
          "&id_token=" + idToken +
          "&state=" + signinRequest.getState());
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

  const googleIdToken = verifier.verify(assertion); // TODO Install Token Verifier library
  const userEmail = googleIdToken.getPayload().getEmail();
  const userId = googleIdToken.getPayload().getSubject();
  // TODO Fetch or Create user from DB

  const authCode = generateAuthCode(oAuthClient, null, scope); // TODO Add Correct User
  const idToken = generateIdToken(null); //TODO Add Correct User

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