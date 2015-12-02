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


var htmlparser = require('htmlparser2');
var http = require('http');
var querystring = require('querystring');
var urlModule = require('url');


/**
 * @typedef {{
 *   url: !http.Url,
 *   host: string,
 *   protocol: string,
 *   path: string,
 *   query: !Object<string, string>
 * }}
 */
const Request = {};


/**
 * Consumes all the content into a single string.
 *
 * Yes. It's very inefficient, but good for demo.
 *
 * @param {string} urlString
 * @return {!Request}
 */
module.exports.request = function request(urlString) {
  let url = urlModule.parse(urlString);
  return {
    url: url,
    host: url.host,
    protocol: url.protocol,
    path: url.pathname,
    query: url.query ? querystring.parse(url.query) : {}
  };
}


/**
 * @param {!http.ServerRequest} req
 * @return {!Object<string, string>}
 */
module.exports.getCookies = function getCookies(req) {
  let res = {};
  let cookieJarString = req.headers['cookie'];
  if (cookieJarString) {
    cookieJarString.split(';').forEach((cookieString) => {
      let eq = cookieString.indexOf('=');
      if (eq > 0) {
        res[cookieString.substring(0, eq).trim()] = decodeURIComponent(
            cookieString.substring(eq + 1).trim());
      }
    });
  }
  return res;
}


/**
 * @param {!http.ServerRequest} req
 * @param {string} name
 * @return {?string}
 */
module.exports.getCookie = function getCookie(req, name) {
  let cookies = module.exports.getCookies(req);
  if (!cookies) {
    return null;
  }
  return cookies[name] || null;
};


/**
 * @param {string} name
 * @param {string} value
 * @param {!Date} expires
 * @return {string}
 */
module.exports.setCookie = function setCookie(name, value, expires) {
  return name + '=' + encodeURIComponent(value) +
            ';expires=' + expires.toGMTString() +
            ';path=/';
};


/**
 * @param {string} url
 * @return {!Promise<string>}
 */
module.exports.httpGet = function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      if (res.statusCode != 200) {
        reject(new Error('GET failed with status ' + url + ':' +
            res.statusCode + ' - ' + res.statusMessage));
      } else {
        module.exports.consumeString(res, 'utf8').then(resolve, reject);
      }
    }).on('error', reject);
  });
};


/**
 * @typedef {{
 *   rpc: string,
 *   login: string
 * }}
 */
const AccessSpec = {};


/**
 * Discovers access spec in the document's metadata.
 * @param {!Metadata} metadata
 * @return {!AccessSpec}
 * @private
 */
module.exports.getAccessSpec = function getAccessSpec(metadata) {
  /* Ex:
    <meta name="amp-access" content="
          rpc=http://localhost:8002/access;
          login=http://localhost:8002/login">
  */
  // TODOSPEC: Does it make sense that the same `rpc` and `login` will
  // be in all documents? What if this is misunderstood and a publisher
  // will try to provide a different RPC request for every URL hoping to
  // do a URL-level control?
  let meta = metadata.meta['amp-access'];
  if (!meta) {
    return null;
  }
  let access = {};
  // TODO: What if URLs contain semicolons?
  let params = meta.split(';');
  params.forEach(function(param) {
    if (!param) {
      return;
    }
    let index = param.indexOf('=');
    if (index <= 0) {
      return;
    }
    access[param.substring(0, index).trim()] =
        param.substring(index + 1).trim();
  });
  return access;
}


/**
 * Consumes all the content into a single string.
 *
 * Yes. It's very inefficient, but good for demo.
 *
 * @param {!http.ServerResponse} resp
 * @param {string} encoding
 * @return {!Promise<string>}
 */
module.exports.consumeString = function consumeString(resp, encoding) {
  return new Promise((resolve, reject) => {
    var content = '';
    resp.setEncoding(encoding);
    resp.on('data', function (chunk) {
      content += chunk;
    });
    resp.on('end', function() {
      resolve(content);
    });
    resp.on('error', (reason) => {
      console.log('------ error:', reason);
      reject(reason);
    });
  });
}


/**
 * @typedef {{
 *   amp: boolean,
 *   links: !Array<!{rel: string, href: string}>,
 *   meta: !Object<string, string>
 * }}
 */
const Metadata = {};


/**
 * Parses HTML metadata.
 * @param {string}
 * @return {!Metadata}
 */
module.exports.parseMetadata = function parseMetadata(html) {
  // TODO: limit to only <HTML> and <HEAD>
  var metadata = {};
  metadata.amp = false;
  metadata.links = [];
  metadata.meta = {};
  var parser = new htmlparser.Parser({
    onopentag: function(name, attrs){
      if (name == 'html') {
        console.log('---- html tag: ', attrs);
        metadata.amp = (attrs['⚡'] !== undefined ||
            attrs['amp'] !== undefined);
      } else if (name == 'link' && attrs.rel && attrs.href) {
        metadata.links.push(attrs);
      } else if (name == 'meta' && attrs.name) {
        metadata.meta[attrs.name] = attrs.content;
      }
    }
  }, {decodeEntities: false});
  parser.write(html);
  parser.end();
  console.log('---- META:', metadata);
  return metadata;
}
