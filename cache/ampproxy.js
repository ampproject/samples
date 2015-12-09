'use strict';
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


var accessdb = require('./accessdb');
var consts = require('./consts');
var htmlparser = require('htmlparser2');
var readerIdService = require('./readeridservice');
var util = require('./util');


/**
 * Transforms and proxies AMP document response. It does several key things:
 * 1. It verifies the access rights to this document.
 * 2. If access cannot be confirmed or denied, the preview version is rendered.
 * 3. Otherwise the full version is rendered.
 */
class AmpProxy {

  constructor() {
  }

  /**
   * Handles AMP proxy requests.
   * @param {!Request} req
   * @parma {!http.ServerResponse} resp
   * @param {string} origin
   * @param {!Metadata} metadata
   * @param {string} html
   */
  proxy(req, resp, origin, metadata, html) {
    console.log('Handle AMP proxy: ', req.path);

    const contentType = 'text/html';

    let accessSpec = util.getAccessSpec(metadata);
    console.log('---- access spec: ', accessSpec);

    // No access spec - no restrictions, serve as is.
    if (!accessSpec) {
      console.log('---- NO ACCESS SPEC');
      resp.writeHead(200, {'Content-Type': contentType});
      resp.write(html);
      resp.end();
      return;
    }

    // Client access control - proxy document as is and let the client deal
    // with it.
    if (accessSpec.type == 'client') {
      console.log('---- proxy with client access');
      resp.writeHead(200, {'Content-Type': contentType});
      this.proxyWithClientAccess_(req, html, metadata, accessSpec, resp);
      return;
    }

    const readerId = readerIdService.getReaderId(req);
    console.log('---- Reader ID: ', readerId);

    // If not done yet - do session redirect.
    if (!readerId) {
      if (readerIdService.sessionRedirect(req, resp)) {
        // Shortcitcuit. The user agent will ask for the document again.
        return;
      }
    }

    // Everything is here: proceed with 200.
    resp.writeHead(200, {'Content-Type': contentType});

    // We know nothing about this user - assume that there's no access.
    if (!readerId) {
      console.log('---- no reader id -> no access');
      this.proxyWithAccess_(req, html, metadata, accessSpec, null, resp);
      return;
    }

    accessdb.getAccessProfile(origin, readerId, accessSpec).
        then((accessProfile) => {
          console.log('---- access profile:', accessProfile);
          return accessProfile;
        }, (reason) => {
          console.log('---- failed: ', reason);
          this.proxyWithAccess_(req, html, metadata, accessSpec, null, resp);
          throw reason;
        }).then((accessProfile) => {
          this.proxyWithAccess_(req, html, metadata, accessSpec, accessProfile,
              resp);
        });
  }

  /**
   * @param {!Request} req
   * @param {string} html
   * @param {!Metadata} metadata
   * @param {!AccessSpec} accessSpec
   * @param {!AccessProfile} accessProfile
   * @param {!http.ServerResponse} resp
   * @private
   */
  proxyWithAccess_(req, html, metadata, accessSpec, accessProfile, resp) {
    // TODOSPEC: In the metered case, how do we display
    //   "You are reading article 3 of 10."
    // Do we need to?

    const that = this;
    let blockOutput = 0;
    let parser = new htmlparser.Parser({
      onopentag: function(name, attrs) {
        if (blockOutput) {
          blockOutput++;
          return;
        }
        if (attrs && attrs['amp-access'] !== undefined) {
          if (!that.checkAccess_(attrs['amp-access'], accessProfile)) {
            blockOutput = 1;
          }
        }
        if (blockOutput) {
          return;
        }
        resp.write('<');
        resp.write(name);
        if (attrs) {
          for (let k in attrs) {
            resp.write(' ');
            resp.write(k);
            if (attrs[k] !== '') {
              resp.write('="');
              resp.write(attrs[k]);
              resp.write('"');
            }
          }
        }
        resp.write('>');
      },
      onclosetag: function(name) {
        if (blockOutput) {
          blockOutput--;
          return;
        }
        if (name == 'head') {
          // Inject amp-login extension.
          resp.write('<script async custom-element="amp-login"' +
              ' src="/client/amp-login.js"></script>');
        }
        if (name == 'body') {
          // TODO(dvoytenko): this belongs in the runtime itself and only on
          // "visible".
          resp.write('<script>');
          resp.write('new Image().src = "/pingback?url=' +
              encodeURIComponent(req.url.href) + '";');
          resp.write('</script>');
        }
        resp.write('</');
        resp.write(name);
        resp.write('>');
      },
      ontext: function(text) {
        if (blockOutput) {
          return;
        }
        resp.write(text);
      },
      oncomment: function(text) {
        if (blockOutput) {
          return;
        }
        resp.write('<!--');
        resp.write(text);
        resp.write('-->');
      },
    }, {decodeEntities: false});
    parser.write(html);
    parser.end();
    resp.end();
  }

  /**
   * @param {!Request} req
   * @param {string} html
   * @param {!Metadata} metadata
   * @param {!AccessSpec} accessSpec
   * @param {!http.ServerResponse} resp
   * @private
   */
  proxyWithClientAccess_(req, html, metadata, accessSpec, resp) {
    let index = html.indexOf('</head>');
    if (index == -1) {
      index = html.indexOf('</HEAD>');
    }
    if (index != -1) {
      resp.write(html.substring(0, index));
    } else {
      resp.write(html);
    }
    resp.write('<script async custom-element="amp-login"' +
        ' src="/client/amp-login.js"></script>');
    resp.write('<script async' +
        ' src="/client/amp-access.js"></script>');
    if (index != -1) {
      resp.write(html.substring(index));
    }
    resp.end();
  }

  /**
   * @param {string} expr
   * @param {!AccessProfile} accessProfile
   * @return {boolean}
   * @private
   */
  checkAccess_(expr, accessProfile) {
    // TODO: proper expression evaluator.
    const hasAccess = accessProfile && accessProfile.hasAccess;
    if (expr == 'access = 1') {
      return hasAccess;
    }
    if (expr == 'access = 0') {
      return !hasAccess;
    }
    return false;
  }
}

module.exports = new AmpProxy();



const PREAMBLE = 'AMP:ACCESS:';

/**
 * @param {string} html
 * @param {number} pos
 */
function nextMarker(html, pos) {
  // <!--AMP:ACCESS:NOTOK-->
  // <!--AMP:ACCESS:OK-->
  while (pos < html.length) {
    pos = html.indexOf('<!--', pos);
    if (pos == -1) {
      break;
    }
    let startPos = pos;
    pos += 4;
    if (pos >= html.length) {
      break;
    }
    let open = html[pos] != '/';
    if (!open) {
      pos++;
    }
    if (pos >= html.length) {
      break;
    }
    if (html.substr(pos, PREAMBLE.length) == PREAMBLE) {
      pos += PREAMBLE.length;
    } else {
      continue;
    }
    let endPos = html.indexOf('-->', pos);
    if (endPos == -1) {
      break;
    }
    let name = html.substring(pos, endPos).trim();
    if (!name) {
      break;
    }
    endPos += 3;
    return {name: name, open: open, startPos: startPos, endPos: endPos};
  }
  return null;
}
