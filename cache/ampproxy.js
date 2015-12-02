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
var viewer = require('./viewer');
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

    let accessSpec = util.getAccessSpec(metadata);
    console.log('---- access spec: ', accessSpec);

    // No access spec - no restrictions, serve as is.
    if (!accessSpec) {
      console.log('---- NO ACCESS SPEC');
      resp.write(html);
      resp.end();
      return;
    }

    let cacheToken = this.getCacheToken_(req);
    let now = Date.now();
    console.log('---- cache token: ', cacheToken);

    // We know nothing about this user - assume that there's no access.
    if (!cacheToken) {
      console.log('---- no cache token -> no access');
      this.proxyWithAccess_(req, html, metadata, accessSpec, false, resp);
      return;
    }

    accessdb.hasAccess(origin, cacheToken, accessSpec).then((hasAccess) => {
      console.log('---- has access:', hasAccess);
      this.proxyWithAccess_(req, html, metadata, accessSpec, hasAccess, resp);
    }, (reason) => {
      console.log('---- failed: ', reason);
    });
  }

  /**
   * Returns "cache token" for the request. It identifies a AMP Cache user or
   * a AMP Cache session.
   * @param {!Request} req
   * @return {?string}
   */
  getCacheToken_(req) {
    // TODOSPEC: Confirm this. This is problematic because:
    // 1. We use cookie to get CacheToken, but there's only one place where
    //    it can be reliably set, in postback.login request handler. What if
    //    this method becomes unavailable?
    // 2. How do we prevent malicious users from abusing this key?
    // 3. Can we propagate GAIA context into cache request? How?
    // 4. How do we ensure stability of this token?
    return util.getCookie(req.serverReq, consts.CACHE_TOKEN_COOKIE) || null;
  }

  /**
   * @param {!Request} req
   * @param {string} html
   * @param {!Metadata} metadata
   * @param {!AccessSpec} accessSpec
   * @param {boolean} hasAccess
   * @param {!http.ServerResponse} resp
   * @private
   */
  proxyWithAccess_(req, html, metadata, accessSpec, hasAccess, resp) {
    // TODOSPEC: In the metered case, how do we display
    //   "You are reading article 3 of 10."
    // Do we need to?

    // TODO: consider hasAccess to be a enum of values: UNKNOWN, DENIED, etc.
    let pos = 0;
    let blockOutput = 0;
    while (pos < html.length) {
      let marker = nextMarker(html, pos);
      if (!marker) {
        break;
      }

      if (!blockOutput && pos < marker.startPos) {
        resp.write(html.substring(pos, marker.startPos));
      }
      pos = marker.endPos + 1;

      if (marker.open) {
        if (!blockOutput) {
          if (marker.name == 'NOTOK' && hasAccess ||
                marker.name == 'OK' && !hasAccess) {
            blockOutput = 1;
          }
        } else {
          blockOutput++;
        }
      } else {
        if (blockOutput > 0) {
          blockOutput--;
          if (blockOutput == 0) {
          }
        }
      }
    }

    if (pos < html.length) {
      resp.write(html.substring(pos));
    }

    if (!hasAccess) {
      viewer.includeViewerCode(req.host, req.path, resp);
    }

    resp.end();
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
