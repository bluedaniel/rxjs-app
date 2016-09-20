// postcss.plugins.js

module.exports = [
  require('postcss-url')(),
  require('postcss-nested')(),
  require('postcss-custom-media')({
    extensions: {
      '--viewport-large': '(width >= 500px)'
    },
    preserve: true
  }),
  require('postcss-cssnext')(),
  require('postcss-font-magician')(),
  require('lost')()
];
