import React from 'react';
import { withRouter } from 'react-router'
import './amp-document.css'

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
     * Child element that will wrap the AMP shadow root.
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

    /**
     * Provides AMP functionality on the newly created shadow root after
     * an AMP document is attached.
     * @private
     * @type {Object}
     */
    this.shadowAmp_ = null;

    /**
     * The root node of the shadow AMP.
     * @note A single node must not be reused for multiple shadow AMP docs.
     * @type {Element}
     */
    this.shadowRoot_ = null;

    /** @private */
    this.boundClickListener_ = this.clickListener_.bind(this);
  }

  componentDidMount() {
    this.container_.addEventListener('click', this.boundClickListener_);

    this.fetchAndAttachAmpDoc_(this.props.src);
  }

  componentWillUnmount() {
    this.closeShadowAmpDoc_();

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
        // Hide navigational and other unwanted elements before displaying.
        this.hideUnwantedElementsOnDocument_(doc);

        // Replace the old shadow root with a new div element.
        const oldShadowRoot = this.shadowRoot_;
        this.shadowRoot_ = document.createElement('div');
        if (oldShadowRoot) {
          this.container_.replaceChild(this.shadowRoot_, oldShadowRoot);
        } else {
          this.container_.appendChild(this.shadowRoot_);
        }

        // Attach the shadow document to the new shadow root.
        this.shadowAmp_ = amp.attachShadowDoc(this.shadowRoot_, doc, url);
      });
    }).catch(error => {
      this.setState({'offline': true});
    });
  }

  /**
   * Cleans up internal state of current shadow AMP document.
   * @private
   */
  closeShadowAmpDoc_() {
    if (typeof this.shadowAmp_.close === 'function') {
      this.shadowAmp_.close();
    }
  }

  /**
   * Hides elements (e.g. banners) that would clash with the app shell.
   * @param {!Document} doc
   * @private
   */
   hideUnwantedElementsOnDocument_(doc) {
     const banners = doc.getElementsByClassName('banner');
     for (let i = 0; i < banners.length; i++) {
       banners[i].style.display = 'none';
     }
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

    let a = null;

    if (e.path) {
      // Check `path` since events that cross the Shadow DOM boundary are retargeted.
      // See http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/#toc-events
      for (let i = 0; i < e.path.length; i++) {
        const node = e.path[i];
        if (node.tagName === 'A') {
          a = node;
          break;
        }
      }
    } else {
      // Polyfill for `path`.
      let node = e.target;
      while (node && node.tagName !== 'A') {
        node = node.parentNode;
      }
      a = node;
    }

    if (a && a.href) {
      const url = new URL(a.href);
      if (url.origin === window.location.origin) {
        // Perform router push instead of page navigation.
        e.preventDefault();
        // Clean up current shadow AMP document.
        this.closeShadowAmpDoc_();
        // Router push reuses current component with new props.
        this.props.router.push(url.pathname);
        return false;
      }
    }

    return true;
  }
}
AMPDocument.propTypes = { src: React.PropTypes.string.isRequired }
export default withRouter(AMPDocument);
