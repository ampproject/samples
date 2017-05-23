class Article {

    constructor(url, card) {
        this.url = url.replace('www.', 'amp.');
        this.card = card;
    }

    fetch(url) {

        // unfortunately fetch() does not support retrieving documents,
        // so we have to resort to good old XMLHttpRequest.
        var xhr = new XMLHttpRequest();

        return new Promise((resolve, reject) => {
            xhr.open('GET', 'https://seed-octagon.glitch.me/' + encodeURIComponent(this.url), true);
            xhr.responseType = 'document';
            xhr.setRequestHeader('Accept', 'text/html');
            xhr.onload = function() {
            // .responseXML contains a ready-to-use Document object
            resolve(xhr.responseXML);
            };
            xhr.send();
        });

    }

    load() {
        return this.doc ? new Promise(resolve => resolve()) : this.fetch().then(doc => {
            this.doc = doc;
            this.sanitize();
        });
    }

    clear() {
        this.ampDoc.close();
        this.destroyShadowRoot();
    }

    sanitize() {
        let doc = this.doc;

        // remove stuff we don't need in embed mode
        doc.getElementsByTagName('header')[0].remove();
        doc.getElementsByTagName('amp-sidebar')[0].remove();
        doc.querySelector('header.content__head').remove();

        // only hide featured image, as we still need to measure it
        this.doc.querySelector('.media-primary amp-img').style.display = 'none';

        // insert stylesheet that styles the featured image
        // TODO; copy stylesheet from host over directly
        var stylesheet = document.createElement('link');
        stylesheet.setAttribute('rel', 'stylesheet');
        stylesheet.setAttribute('href', 'css/card.css');
        this.doc.body.append(stylesheet);

    }

    getFeaturedImageHeight() {
        var img = this.doc.querySelector('.media-primary amp-img');
        var height = (parseInt(img.getAttribute('height')) / parseInt(img.getAttribute('width'))) * window.innerWidth;
        return height;
    }

    createShadowRoot() {
        var shadowRoot = document.createElement('article');
        document.body.appendChild(shadowRoot);
        return shadowRoot;
    }

    destroyShadowRoot() {
        document.body.removeChild(this.container);
    }

    cloneCard() {

        let card = this.card.elem.cloneNode(true);

        // clear all transforms
        card.style.transform = '';
        card.style.margin = '0';
        card.children[0].style.transform = '';
        card.children[1].style.transform = '';

        // resize card to image ratio
        card.style.height = (innerWidth * this.card.imageData.ratio) + 'px';
        card.style.opacity = '0';

        this.clonedCard = card;
        return card;

    }

    animateIn() {

        let offset = (innerWidth * this.card.imageData.ratio) / 2;
        this.container.style.transform = 'translateY(' + scrollY + 'px)';
        return this.container.animate([
            { opacity: 0, transform: 'translateY(' + (offset + scrollY) + 'px)' },
            { opacity: 1, transform: 'translateY(' + scrollY + 'px)' }
        ], { duration: getAnimationSpeed(), easing: 'ease-out' });

    }

    animateOut() {

        let offset = (innerWidth * this.card.imageData.ratio) / 2;
        this.container.style.transform = 'translateY(' + (offset + scrollY) + 'px)';
        return this.container.animate([
            { opacity: 1, transform: 'translateY(' + (scrollY) + 'px)' },
            { opacity: 0, transform: 'translateY(' + (offset + scrollY) + 'px)' }
        ], { duration: getAnimationSpeed(), easing: 'ease-out' });

    }

    show() {

        // Create an empty container for the AMP page
        this.container = this.createShadowRoot();

        // Tell Shadow AMP to initialize the AMP page in prerender-mode
        this.ampDoc = AMP.attachShadowDoc(this.container, this.doc, this.url);
        this.ampDoc.setVisibilityState('prerender');

        // Wait until the doc is ready to be used
        this.ampDoc.ampdoc.whenReady().then(() => {

            // We need to clone the header
            // into the Shadow DOM so it scrolls along
            var card = this.cloneCard();
            this.ampDoc.ampdoc.getBody().prepend(card);

            // add class to html element for global CSS stuff
            document.documentElement.classList.add('article-shown');

            return new Promise((resolve, reject) => {
                this.animateIn().onfinish = () => {

                    // Hide the original card, show the cloned one
                    this.card.elem.style.opacity = '0';
                    card.style.opacity = '1';

                    // Set the visibility state of the AMP doc to visible
                    this.ampDoc.setVisibilityState('visible');

                    resolve();
                };
            });

        });

    }

    hide() {

        // remove class to html element for global CSS stuff
        document.documentElement.classList.remove('article-shown');

        // Show the card header
        this.card.elem.style.opacity = '1';

        // Hide the cloned header
        this.clonedCard.style.opacity = '0';

        return new Promise((resolve, reject) => {
            this.animateOut().onfinish = () => {
                this.clear();
                resolve();
            };
        });

    }

}