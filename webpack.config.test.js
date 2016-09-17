const path = require('path');

module.exports = {
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    loaders: [ {
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]',
        'postcss-loader'
      ]
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|jpeg)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    } ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src/scripts'),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  postcss: function (webpack) {
    return [
      require('postcss-import')({
        addDependencyTo: webpack
      }),
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
  }
};
