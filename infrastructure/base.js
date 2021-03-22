/* eslint-disable */
const { merge } = require('webpack-merge')
const path = require('path')
const dotenv = require('dotenv')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

const { parsed: userEnv } = dotenv.config()

const cwd = (relativePath) => path.resolve(process.cwd(), relativePath)

module.exports = (env) => {
  return merge(
    {},
    {
      entry: cwd('./src/index.tsx'),
      output: {
        path: cwd(`dist/lavka-dostavka`),
        publicPath: '/',
      },

      module: {
        rules: [
          {
            loader: 'ts-loader',
            test: /\.tsx?$/,
            exclude: /node_modules/,
            options: {
              transpileOnly: true,
            },
          },
          {
            test: /\.s?css$/,
            exclude: /\.module\.scss$/,
            use: getCssLoaders(false, env),
          },
          {
            test: /\.module\.scss$/,
            use: getCssLoaders(true, env),
          },
          {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
          },
          {
            loader: 'file-loader',
            test: /\.(eot|otf|svg|ttf|woff|woff2|png|pdf|ico|gif)$/,
          },
          {
            use: [path.resolve(__dirname, './tools/i18n/loader.js')],
            test: /\.i18n\.json$/,
          },
        ],
      },

      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          templateParameters: { projectName: 'Лавка Доставка' },
          template: cwd('./public/index.ejs'),
          favicon: cwd('./public/favicon.ico'),
        }),
        new CircularDependencyPlugin({
          exclude: /node_modules/,
          failOnError: true,
        }),
        new webpack.EnvironmentPlugin({
          ...env,
          ...userEnv,
        }),
      ].filter(Boolean),

      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: ['src', 'node_modules'],
        alias: { '~': cwd('src') },
      },
    },
  )
}

/**
 * Get CSS Loaders
 */
function getCssLoaders(useModules, env) {
  return [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          auto: useModules,
          localIdentName: env.NODE_ENV === 'production' ? '[hash:base64]' : '[name]__[local]',
        },
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [
          require('autoprefixer')(),
          require('postcss-pxtorem')({
            rootValue: 16,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: ['html'],
          }),
        ],
      },
    },
    'sass-loader',
  ]
}
