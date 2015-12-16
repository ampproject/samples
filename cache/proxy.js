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


var ampProxy = require('./ampproxy');
var http = require('http');
var urlModule = require('url');
var util = require('./util');


/**
 * Proxies resources. If it's an AMP HTML document, the proxying is delegated
 * to AmpProxy. Otherwise, this is a very boring class.
 */
class BoringProxy {

  constructor() {
  }

  getHandler() {
    return this.proxy_.bind(this);
  }

  getServerAccessHandler() {
    return this.serverAccess_.bind(this);
  }

  getServerPingHandler() {
    return this.serverPing_.bind(this);
  }

  /**
   * @param {string} url
   * @return {!Promise<!Metadata>}
   */
  getMetadata(url) {
    // This should be typically very fast since the document should be in cache.
    return util.httpGet(url).then((html) => {
      return util.parseMetadata(html);
    }).catch((reason) => {
      console.log('-- metadata request failed:', reason);
      return Promise.reject(reason);
    });
  }

  /**
   * @param {string} cacheUrlString
   * @return {string}
   */
  getProxyUrl(cacheUrlString) {
    let req = urlModule.parse(cacheUrlString);
    let host = null;
    let path = null;

    // URL: https://cache.com/publisher.com/archive/story1.html
    if (req.path) {
      let index1 = req.path.indexOf('/');
      let index2 = req.path.indexOf('/', 1);
      if (index1 == 0 && index2 != -1) {
        host = req.path.substring(1, index2);
        path = req.path.substring(index2);
      }
    }
    if (!host || !path) {
      return null;
    }

    return req.protocol + '//' + host + path;
  }

  /**
   * Handles proxy requests.
   * @param {!Request} req
   * @parma {!http.ServerResponse} resp
   * @private
   */
  proxy_(req, resp) {
    console.log('Handle proxy: ', req.path);

    this.proxyRequest_(req, req.serverReq).then((res) => {
      this.handleProxyResponse_(req, resp, res.origin, res.resp);
    }, (reason) => {
      console.log('-- proxy request failed:', reason);
      resp.writeHead(400, 'Bad request');
      resp.end();
    });
  }

  /**
   * @param {!Request} req
   * @param {?http.ServerRequest} serverReq
   * @return {!Promise<{origin: string, resp: !http.ServerResponse}>}
   */
  proxyRequest_(req, serverReq) {
    let origin = null;
    let hostname = null;
    let port = req.protocol == 'https' ? 443 : 80;
    let path = null;

    // URL: https://cache.com/publisher.com/archive/story1.html
    if (req.path) {
      let index1 = req.path.indexOf('/');
      let index2 = req.path.indexOf('/', 1);
      if (index1 == 0 && index2 != -1) {
        hostname = req.path.substring(1, index2);
        path = req.path.substring(index2);
      }
    }
    origin = hostname;
    if (hostname) {
      let portIndex = hostname.indexOf(':');
      if (portIndex != -1) {
        port = parseInt(hostname.substring(portIndex + 1)) || 80;
        hostname = hostname.substring(0, portIndex);
      }
    }
    console.log('---- origin request: ', origin, hostname, port, path);
    if (!origin || !path) {
      return Promise.reject();
    }

    let options = {
      protocol: req.protocol,
      hostname: hostname,
      port: port,
      path: path,
      method: 'GET'
    };
    return new Promise((resolve, reject) => {
      if (serverReq) {
        let proxy = http.request(options, (proxyResp) => {
          resolve({origin: origin, resp: proxyResp});
        });
        serverReq.pipe(proxy, {end: true});
      } else {
        http.get(options, (resp) => {
          resolve({origin: origin, resp: resp});
        });
      }
    });
  }

  /**
   * Handles proxy response.
   * @param {!Request} req
   * @parma {!http.ServerResponse} resp
   * @param {string} origin
   * @parma {!http.ServerResponse} proxyResp
   * @private
   */
  handleProxyResponse_(req, resp, origin, proxyResp) {
    console.log('---- proxy response: ' + proxyResp.statusCode + ' ' +
        proxyResp.statusMessage);

    // If failed - shortcircuit.
    if (proxyResp.statusCode != 200) {
      resp.writeHead(proxyResp.statusCode, proxyResp.statusMessage);
      resp.end();
      return;
    }

    // TODO: copy bunch of headers.
    let contentType = proxyResp.headers['content-type'];

    // If not HTML - proxy without interference.
    let isHtml = (contentType && contentType.indexOf('text/html') != -1);
    if (!isHtml) {
      console.log('---- NOT HTML');
      resp.writeHead(200, {'Content-Type': contentType});
      proxyResp.pipe(resp, {end: true});
      return;
    }

    util.consumeString(proxyResp, 'utf8').then(
        this.proxyHtml_.bind(this, req, resp, origin),
        (reason) => {
          console.log('---- failed: ', reason);
          resp.end();
        });
  }

  /**
   * Proxies HTML response.
   * @param {!Request} req
   * @parma {!http.ServerResponse} resp
   * @param {string} origin
   * @parma {string} html
   * @private
   */
  proxyHtml_(req, resp, origin, html) {
    let metadata = util.parseMetadata(html);
    if (!metadata.amp) {
      console.log('---- NOT AMP');
      resp.writeHead(200, {'Content-Type': contentType});
      resp.write(html);
      resp.end();
      return;
    }

    try {
      ampProxy.proxy(req, resp, origin, metadata, html);
    } catch (e) {
      console.log('AMP Proxying failed: ', e);
      resp.end();
    }
  }

  /**
   * Handles proxy requests.
   * @param {!Request} req
   * @parma {!http.ServerResponse} resp
   * @private
   */
  serverAccess_(req, resp) {
    this.serverService_(req, resp, 'rpc');
  }

  /**
   * Handles proxy requests.
   * @param {!Request} req
   * @parma {!http.ServerResponse} resp
   * @private
   */
  serverPing_(req, resp) {
    this.serverService_(req, resp, 'ping');
  }

  /**
   * Handles proxy requests.
   * @param {!Request} req
   * @parma {!http.ServerResponse} resp
   * @param {string} service
   * @private
   */
  serverService_(req, resp, service) {
    console.log('Handle server access: ', service, req.path, req.query);

    let ampRequest = util.request(req.query['url']);
    ampRequest.serverReq = req.serverReq;

    // TODO(dvoytenko): ideally these will always be served from cache
    this.proxyRequest_(ampRequest, ampRequest.serverReq).then((res) => {
      ampRequest.query['rid'] = req.query['rid'];
      ampRequest.query['sections'] = req.query['sections'];
      this.handleServerServiceResponse_(service, ampRequest, resp, res.origin,
          res.resp);
    }, (reason) => {
      console.log('-- proxy request failed:', reason);
      resp.writeHead(400, 'Bad request');
      resp.end();
    });
  }

  /**
   * Handles server access response.
   * @param {string} service
   * @param {!Request} req
   * @parma {!http.ServerResponse} resp
   * @param {string} origin
   * @parma {!http.ServerResponse} proxyResp
   * @private
   */
  handleServerServiceResponse_(service, req, resp, origin, proxyResp) {
    console.log('---- proxy response: ' + proxyResp.statusCode + ' ' +
        proxyResp.statusMessage);

    // If failed - shortcircuit.
    if (proxyResp.statusCode != 200) {
      resp.writeHead(404);
      resp.end();
      return;
    }

    // TODO: copy bunch of headers.
    let contentType = proxyResp.headers['content-type'];

    // If not HTML - proxy without interference.
    let isHtml = (contentType && contentType.indexOf('text/html') != -1);
    if (!isHtml) {
      console.log('---- NOT HTML');
      resp.writeHead(404);
      resp.end();
      return;
    }

    util.consumeString(proxyResp, 'utf8').then(
        this.proxyServerServiceHtml_.bind(this, service, req, resp, origin),
        (reason) => {
          console.log('---- failed: ', reason);
          resp.end();
        });
  }

  /**
   * Proxies HTML response.
   * @param {string} service
   * @param {!Request} req
   * @parma {!http.ServerResponse} resp
   * @param {string} origin
   * @parma {string} html
   * @private
   */
  proxyServerServiceHtml_(service, req, resp, origin, html) {
    let metadata = util.parseMetadata(html);
    if (!metadata.amp) {
      console.log('---- NOT AMP');
      resp.writeHead(404);
      resp.end();
      return;
    }

    try {
      ampProxy.serverService(service, req, resp, origin, metadata, html);
    } catch (e) {
      console.log('AMP Server Access failed: ', e);
      resp.end();
    }
  }
}

module.exports = new BoringProxy();
