RxJs App
========

Architecture
------------

This is a boilerplate application that uses Observable streams in a Flux based architecture.

All `actions$` and `drivers$` (side-effects) are themselves observable functions and update one single `state$` stream.

In this boilerplate app, the `state$` ultimately performs a simple Snabbdom patch function with the old & new state to render the App.

Boilerplate features
--------------------
- Hyperscript instead of JSX
- Webpack v2
  - Tree-shaking
  - Bundle splitting (bundle for both guests & authenticated users)
- CSS Modules
- PostCSS with plugins
- RxJs v5 brings improvements in speed, features, documentation and smaller builds.
- Uses Lodash/fp for a more FP approach around the app.
- Modern testing with Ava
- Robust linting using Eslint & Stylelint.
- Lightweight Express development server with authentication
- Simple Dockerfile to host the app with Nginx.

Run
---

Site will be up on [http://localhost:8000](http://localhost:8000)

````bash
# Starts a webpack dev server
$ npm run watch

# Starts an express server
$ node server

````

Build
-----


````bash
$ npm run bundle && npm run docker-build && npm run docker-run
````
