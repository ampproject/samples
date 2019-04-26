# amp-concert

Get ready to 🎸.

## Setup

Basically grab a version of [node] with your favorite [node version manager] that lines up with what's in `.node-version` and then:

```sh
npm install
npm run dev
open http://localhost:8080
```

## Configuration

| Variable | Description |
| :--- | :--- |
| `PORT` | Port on which to bind the FE server or dev server. |
| `NODE_ENV` | Set to `production` to disable development features and enable code minification in the build. Otherwise leave undefined for development. |
| `WEB_URL` | Base URL at which the app is hosted. Used to generate full URLs for variety of things since AMP needs them. |

Basic styles can be controlled by tinkering with `theme.js`.

## Testing

Basic setup. Runs [eslint] against [eslint-config-metalab] for basic sanity checking and then verifies the page is valid amp using a small script and [amphtml-validator].

```sh
npm test
```

You can also run the checks individually:

```sh
npm run test:lint
npm run test:amplint
```

Code is formatted using [prettier] because that's what you should be doing.

## Folder/App Structure

A basic overview:

```
 - src [source files]
   - component [react components]
   - server [server-side / api code]
   - util [utility functions]
   - theme.js [app theme]
 - static [assets served under /static]
```

A more complete breakdown of this structure and a variety of the choices made herein can be found in the following articles:

 * https://medium.com/bootstart/why-you-should-use-babel-resolvers-210615fc41d
 * https://medium.com/bootstart/you-should-be-using-folder-components-b30b7d165c39
 * https://medium.com/bootstart/the-granger-component-taxonomy-24c795fa02fb

## Deployment

This app is meant to be deployed to [heroku], though it would probably happily exist in other environments. The `node` buildpack will run the following:

```sh
npm install
```

And then start the app with:

```sh
npm start
```

The generated code lives in `/dist` and this information should be enough to self-host in just about any other environment (Docker, bare metal, etc.).

[eslint]: https://eslint.org
[eslint-config-metalab]: https://github.com/metalabdesign/eslint-config-metalab
[amphtml-validator]: https://www.npmjs.com/package/amphtml-validator
[prettier]: https://prettier.io/
[heroku]: https://www.heroku.com/
[node version manager]: https://github.com/ekalinin/nodeenv
[node]: https://nodejs.org
