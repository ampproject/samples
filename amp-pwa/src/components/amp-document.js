import React from 'react';
import { withRouter } from 'react-router'

/**
 * Fetches the AMP document at a given `src` URL and renders it via Shadow DOM.
 */
class AMPDocument extends React.Component {
  constructor(props) {
    super(props);

    // 'offline' is set to true if and when the document fetch fails.
    this.state = {'offline': false};

    /**
     * `window.AMP` is set by the AMP runtime when it finishes loading.
     * @const
     * @private
     */
    this.ampReadyPromise_ = new Promise(resolve => {
      (window.AMP = window.AMP || []).push(resolve);
    });

    /**
     * Child element that the AMP document will be added as a shadow root to.
     * @private
     * @type {Element}
     */
    this.container_ = null;

    /**
     * XMLHTTPRequest that fetches the AMP document.
     * @private
     * @type {XMLHTTPRequest}
     */
    this.xhr_ = null;

    /** @private */
    this.boundClickListener_ = this.clickListener_.bind(this);
  }

  componentDidMount() {
    this.container_.addEventListener('click', this.boundClickListener_);

    this.fetchAndAttachAmpDoc_(this.props.src);
  }

  componentWillUnmount() {
    this.container_.removeEventListener('click', this.boundClickListener_);

    if (this.xhr_) {
      this.xhr_.abort();
      this.xhr_ = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    this.fetchAndAttachAmpDoc_(nextProps.src);
  }

  render() {
    if (this.state.offline) {
      return (
        <div>
          <h2>Houston, we have a problem.</h2>
          <p>Looks like we are offline&mdash;please check your Internet connection.</p>
        </div>
      );
    } else {
      return (<div className='amp-container' ref={ref => this.container_ = ref} />);
    }
  }

  /**
   * Fetches the AMP document at `url` and attaches it as a shadow root.
   * @private
   * @param {string} url
   */
  fetchAndAttachAmpDoc_(url) {
    this.fetchDocument_(url).then(doc => {
      return this.ampReadyPromise_.then(amp => {
        amp.attachShadowDoc(this.container_, doc, url);
      });
    }).catch(error => {
      this.setState({'offline': true});
    });
  }

  /**
   * Fetches and parses HTML at `url`.
   * @private
   * @param {string} url
   * @return {!Promise<!Document|!string>} If fetch succeeds, resolved with {!Document}.
   *         Otherwise, rejects with {!string} error description.
   */
  fetchDocument_(url) {
    return new Promise((resolve, reject) => {
      this.xhr_ = new XMLHttpRequest();
      this.xhr_.open('GET', url, true);
      this.xhr_.responseType = 'document';
      // This is set to text/* instead of text/html because the development server
      // only forwards requests to the proxy for requests whose 'Accept' header
      // is NOT text/html.
      // https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development
      this.xhr_.setRequestHeader('Accept', 'text/*');
      this.xhr_.onreadystatechange = () => {
        if (this.xhr_.readyState < /* STATUS_RECEIVED */ 2) {
          return;
        }
        if (this.xhr_.status < 100 || this.xhr_.status > 599) {
          this.xhr_.onreadystatechange = null;
          reject(new Error(`Unknown HTTP status ${this.xhr_.status}`));
          this.xhr_ = null;
          return;
        }
        if (this.xhr_.readyState === /* COMPLETE */ 4) {
          if (this.xhr_.responseXML) {
            resolve(this.xhr_.responseXML);
          } else {
            reject(new Error('No xhr.responseXML'));
          }
          this.xhr_ = null;
        }
      };
      this.xhr_.onerror = () => { reject(new Error('Network failure')); };
      this.xhr_.onabort = () => { reject(new Error('Request aborted')); };
      this.xhr_.send();
    });
  }

  /**
   * Event listener that redirects clicks on same-domain links to react-router.
   * This avoids page reload due to navigation from same-domain links in the AMP document,
   * which affords seamless UX in the style of a single-page app.
   * @private
   * @param e {!Event}
   */
  clickListener_(e) {
    if (e.defaultPrevented) {
      return false;
    }
    // Check `path` since events that cross the Shadow DOM boundary are retargeted.
    // See http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/#toc-events
    const a = e.path[0];
    if (a.tagName === 'A' && a.href) {
      const url = new URL(a.href);
      if (url.origin == window.location.origin) {
        e.preventDefault();
        this.props.router.push(url.pathname);
        return false;
      }
    }
    return true;
  }
}
AMPDocument.propTypes = { src: React.PropTypes.string.isRequired }
export default withRouter(AMPDocument);
