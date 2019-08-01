/**
 * webapck 基础配置
 * @author luyanhong 2018-11-19
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { WEBPACK_COMMON_CONFIG } = require('../config');
const resolve = (dir) => {
  return path.join(__dirname, '..', dir);
};

module.exports = (env) => {
  const isProd = env.production === true;
  return {
    entry: WEBPACK_COMMON_CONFIG.entry,
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': resolve('src'),
        assets: resolve('src/assets'),
        coms: resolve('src/components'),
        server: resolve('server'),
        api: resolve('src/api'),
        utils: resolve('src/utils')
      }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          common: {
            minChunks: 6,
            name: 'common',
            minSize: 1000,
            chunks: 'initial'
          },
          vendors: {
            test: /node_modules/,
            name: 'vendors',
            priority: 10,
            enforce: true,
            chunks: 'all'
          }
        }
      },
      runtimeChunk: {
        name: 'manifest'
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: isProd ? 'babel-loader' : ['babel-loader?cacheDirectory', 'eslint-loader'],
          include: [WEBPACK_COMMON_CONFIG.sourceCode, resolve('config')]
        },
        {
          test: /\.scss$/,
          include: WEBPACK_COMMON_CONFIG.sourceCode,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProd
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !isProd
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProd
              }
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  resolve('src/assets/vars.scss'),
                  resolve('src/assets/mixins.scss')
                ]
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          include: resolve('src'),
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: isProd ? 'img/[name].[hash:7].[ext]' : 'img/[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
          include: resolve('src/assets/fonts'),
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 2048,
                publicPath: isProd ? `file:///${WEBPACK_COMMON_CONFIG.assetsDirectory}`: WEBPACK_COMMON_CONFIG.assetsPublicPath,
                name: isProd ? 'font/[name].[hash:7].[ext]' : 'fonts/[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([
        `${WEBPACK_COMMON_CONFIG.assetsDirectory}/`,
      ], {
        root: WEBPACK_COMMON_CONFIG.projectRoot
      }),
      new HtmlWebpackPlugin({
        template: WEBPACK_COMMON_CONFIG.assetsViews,
        filename: 'index.html',
        inject: true,
        cache: false,
        // favicon: path.resolve(__dirname, '../favicon.ico')
      })
    ]
  };
};
