[![Build Status](https://s3-eu-west-1.amazonaws.com/lambci-buildresults-1wp4fayx70af6/gh/bluedaniel/rxjs-app/branches/master/baa548e0d79020375c2c3a03c279caad.svg)](https://s3-eu-west-1.amazonaws.com/lambci-buildresults-1wp4fayx70af6/gh/bluedaniel/rxjs-app/branches/master/f5218d3c6406f04bc47f29154c5f11ce.html)
[![Coverage Status](https://coveralls.io/repos/github/bluedaniel/rxjs-app/badge.svg?branch=master)](https://coveralls.io/github/bluedaniel/rxjs-app?branch=master)

RxJs App
========

This is a boilerplate application that uses Observable streams in a Flux based architecture.

All `actions$` and `drivers$` (side-effects) are themselves observable functions and update one single `state$` stream.

In this boilerplate app, the `state$` ultimately performs a simple Snabbdom patch function with the old & new state to render the App.

Features
--------
- [Hyperscript/Snabbdom](https://github.com/paldepind/snabbdom), with some [useful utilities](https://github.com/ohanhi/hyperscript-helpers), for creating components.
- [Webpack v2](https://github.com/webpack/webpack) config with:
  - Tree-shaking.
  - Bundle splitting (one each for guests & authenticated users).
  - [PostCSS](https://github.com/postcss/postcss) with plugins.
  - [CSS Modules](https://github.com/css-modules/css-modules).
- [RxJs v5](https://github.com/ReactiveX/rxjs) brings improvements in speed, features, documentation and modular builds.
- Uses [Ramda](https://github.com/ramda/ramda) for composable state changes and stitching composite views.
- Modern testing with [Ava](https://github.com/avajs/ava) & [Lambci](https://github.com/lambci/lambci).
- Robust linting using [Eslint](https://github.com/eslint/eslint) & [Stylelint](https://github.com/stylelint/stylelint), with standard configs.
- Simple Express development server with authentication example.

Known issues
------------

There is a problem with the package `postcss-import`, the issue is [described here](https://github.com/postcss/postcss-import/issues/207) and can be solved by installing version `8.1.0`.

Run
---

Site will be up on [http://localhost:8000](http://localhost:8000)

````bash
# Starts a webpack dev server
$ npm run watch

# Starts an express server
$ node server

````

Other scripts
-------------


````bash
# Testing with Ava
$ npm test

# Test coverage with Ava/Nyc
$ npm run coverage

# This command will show you what makes up the size of the bundles.
# Useful to see the effect of modular builds (i.e. Ramda and RxJs).
# Note: You will also have a `stats.json` in the project root which you can use
# at https://webpack.github.io/analyse, among others.
$ npm run build-size
````
