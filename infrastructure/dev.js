/* eslint-disable */
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const getBaseConfig = require('./base')

const createDevConfig = (env) => {
  const baseConfig = getBaseConfig(env)

  return merge(baseConfig, {
    mode: 'development',

    output: {
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
    },

    plugins: [new webpack.HotModuleReplacementPlugin()],

    devServer: {
      host: 'localhost',
      port: '8000',
      historyApiFallback: true,
      hot: true,
      inline: true,
      overlay: { errors: true },
      stats: {
        all: false,
        errors: true,
        moduleTrace: true,
        // transpileOnly mode can't handle properly type re-exports, so suppress it
        warningsFilter: /export .* was not found in/,
      },
    },
  })
}

module.exports = createDevConfig
