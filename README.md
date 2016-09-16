RxJs App
========

This is a boilerplate application that uses Observable streams in a Flux based architecture.

All `actions$` and `drivers$` (side-effects) are themselves observable functions and update one single `state$` stream.

In this boilerplate app, the `state$` ultimately performs a simple Snabbdom patch function with the old & new state to render the App.

Features
--------
- Hyperscript, with some useful utilities, for creating components
- Webpack v2 config with:
  - Tree-shaking
  - Bundle splitting (one each for guests & authenticated users)
  - PostCSS with plugins
  - CSS Modules
- RxJs v5 brings improvements in speed, features, documentation and modular builds.
- Uses Ramda for composable state changes and stitching composite views.
- Modern testing with Ava
- Robust linting using Eslint & Stylelint.
- Lightweight Express development server with authentication
- Simple Dockerfile to host the app with Nginx.

Known issues
---

There is a problem with the package `postcss-import`, the issue is described [here](https://github.com/postcss/postcss-import/issues/207) and can be solved by installing version `8.1.0`.

Run
---

Site will be up on [http://localhost:8000](http://localhost:8000)

````bash
# Starts a webpack dev server
$ npm run watch

# Starts an express server
$ node server

````

Profile
-------

This command will show you what makes up the size of the bundles. Useful to see the effect of modular builds (i.e. Ramda and RxJs).

````bash
$ npm run build-size
````

Note: You will also have a stats.json file in the project root which you can use at [https://webpack.github.io/analyse/](https://webpack.github.io/analyse/), among others.

Build
-----

````bash
$ npm run bundle && npm run docker-build && npm run docker-run
````
