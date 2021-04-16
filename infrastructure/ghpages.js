/* eslint-disable */
const { merge } = require('webpack-merge')
const getBaseConfig = require('./base')

const createProdConfig = (env) => {
  const baseConfig = getBaseConfig(env)

  return merge(baseConfig, {
    mode: 'production',

    output: {
      publicPath: "/hostpital-frontend/",
      filename: '[name].[hash].js',
      chunkFilename: '[chunkhash].chunk.js',
    },

    stats: {
      // transpileOnly mode can't handle properly type re-exports, so suppress it
      warningsFilter: /export .* was not found in/,
    },
  })
}

module.exports = createProdConfig
