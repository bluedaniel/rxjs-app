const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEBUG = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    app: [ './src/scripts/app' ],
    guest: [ './src/scripts/guest' ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].js'
  },
  cache: DEBUG,
  devtool: DEBUG ? 'eval' : 'hidden-source-map',
  watch: DEBUG,
  module: {
    loaders: [ {
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        loader: [
          {
            loader: 'css-loader',
            query: {
              sourceMap: DEBUG,
              modules: true,
              localIdentName: '[name]_[local]_[hash:base64:3]',
              minimize: !DEBUG
            }
          },
          'postcss-loader'
        ]
      })
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|jpeg)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    } ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(
          process.env.node_env === 'production' ? 'production' : 'development'
        )
      }
    }),
    new ExtractTextPlugin({
      filename: 'styles.css', // '[name].[id].style.css',
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: !DEBUG,
      debug: DEBUG
    }),
    ...(!DEBUG ? [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false },
        sourceMap: false
      })
    ] : [])
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'src/scripts'),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  postcss: function (webpack) {
    return [
      require('postcss-import')({
        path: path.resolve(__dirname, 'src/styles')
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
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
};
