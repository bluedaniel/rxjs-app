/**
 * This is used to set up the environment that's needed for most
 * of the unit tests for the project which includes babel transpilation
 * with babel-register, polyfilling, and initializing the DOM with jsdom
 */
require('babel-register');
require('babel-polyfill');
require('../../src/scripts/core/rxBindings');

const hook = require('css-modules-require-hook');
const postCSSPlugins = require('../../postcss.plugins');

global.fetch = require('node-fetch');
global.document = require('jsdom').jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;

hook({
  prepend: postCSSPlugins
});
