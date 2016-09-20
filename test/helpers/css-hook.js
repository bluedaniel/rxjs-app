const hook = require('css-modules-require-hook');
const postCSSPlugins = require('../../postcss.plugins');

hook({
  prepend: postCSSPlugins
});
