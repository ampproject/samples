# amp-stories

This project contains a number of sample stories that demostrate core features within AMP Stories.

In this project we demonstrate how to do the following in AMP Stories:

- Animations
- Layouts
- Media Components
- Links, CTAs, and Ads
- And more!

## Quick Setup

To build and serve AMP story pages statically at `http://localhost:8080`, run the following commands

```sh
npm install
npm start
open http://localhost:8080/stories/animations
open http://localhost:8080/stories/behind-the-story
open http://localhost:8080/stories/media-components
open http://localhost:8080/stories/layout
open http://localhost:8080/stories/links-cta-ads
open http://localhost:8080/stories/wrap-up
open http://localhost:8080/stories/millennials
```

## Development Setup

Basically grab a version of [node] with your favorite [node version manager] that lines up with what's in `.node-version` and then:

```sh
npm install
npm run dev
open http://localhost:8080/stories/animations
open http://localhost:8080/stories/behind-the-story
open http://localhost:8080/stories/media-components
open http://localhost:8080/stories/layout
open http://localhost:8080/stories/links-cta-ads
open http://localhost:8080/stories/wrap-up
open http://localhost:8080/stories/millennials

```

## Configuration

| Variable           | Description                                                                                                                                                                                                                                                                                                                    |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PORT`             | Port on which to bind the FE server or dev server.                                                                                                                                                                                                                                                                             |
| `NODE_ENV`         | Set to `production` to disable development features and enable code minification in the build. Otherwise leave undefined for development.                                                                                                                                                                                      |
| `MINIFY_MARKUP`    | Set to `true` to minify the CSS and HTML markup for the pages. By default, the CSS and HTML is not minified, because these pages serve as examples of how to build AMP Stories. However, when running the AMP linter, the markup is minified by default. This ensures that, when minified, the markup _can_ pass as valid AMP. |
| `DISABLE_PREFIXES` | Set to `true` to disable vendor pre-fixing in CSS. Since vendor pre-fixes add to the CSS byte limit of 50000, we given you an option to disable if you want to. By default, vendor pre-fixes are _enabled_.                                                                                                                    |

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

- https://medium.com/bootstart/why-you-should-use-babel-resolvers-210615fc41d
- https://medium.com/bootstart/you-should-be-using-folder-components-b30b7d165c39
- https://medium.com/bootstart/the-granger-component-taxonomy-24c795fa02fb

## Deployment

This project can be deployed in two ways:

1. Static Markup, served through a static hosting service
2. Dynamic Server, as a node server

### Dynamic Server Deployment

The dynamic server is meant to be deployed to [heroku], though it would probably happily exist in other environments. The `node` buildpack will run the following:

```sh
npm install
```

And then start the app with:

```sh
npm run start:server
```

The generated code lives in `/build` and this information should be enough to self-host in just about any other environment (Docker, bare metal, etc.).

### Static Files Deployment

This project can be built and served statically using any static hosting service. To build the static file directory run the following:

```sh
npm install
```

```sh
npm run start:static
```

The generated markup lives in the `/dist` directory, and can be served statically using any static hosting service.

[eslint]: https://eslint.org
[eslint-config-metalab]: https://github.com/metalabdesign/eslint-config-metalab
[amphtml-validator]: https://www.npmjs.com/package/amphtml-validator
[prettier]: https://prettier.io/
[heroku]: https://www.heroku.com/
[node version manager]: https://github.com/ekalinin/nodeenv
[node]: https://nodejs.org
