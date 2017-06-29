# AMP update-cache Demo

The [update-cache](https://developers.google.com/amp/cache/update-ping#update-cache-request) request feature enables publishers to flush content from the AMP Cache at a high rate, as it has additional security meaures. The request must be signed with an RSA key that matches a public key served from the origin domain.

## The Demo
A live version of this demo is available at [https://amp-cache-refresh.appspot.com/](https://amp-cache-refresh.appspot.com/).

### Requirements
- Node >= 8.1.2

### Running
- Clone the project and navigate to the `amp-update-cache` directory.
- Run `npm install` to install the project dependencies.
- Run `npm start`
- Navigate to [http://localhost:3000](http://localhost:3000)

### Usage
The demo requires RSA Keys to be generated and the public key to be available on the origin domain, as described in the [Generate RSA key](https://developers.google.com/amp/cache/update-ping#rsa-keys) section of the documentation.

Once they keys are ready, paste the Cache URL for the document that needs to be flushed, and the Private Key on it's respective fields. 

Click the "Generate Url" button, and a link will be generated and displayed on the screen. Navigating to this link will flush the page from the cache. 

