/**
 * @file webapck 基础配置
 * @author luyanhong 2018-11-19
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
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
        api: resolve('src/api'),
        utils: resolve('src/utils'),
        containers: resolve('src/containers')
      }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          common: {
            minChunks: 3,
            name: 'common',
            minSize: 0,
            chunks: 'all'
          },
          vendors: {
            test: /node_modules/,
            name: 'vendors',
            priority: 10, // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
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
          use: isProd ? 'babel-loader?cacheDirectory' : ['babel-loader?cacheDirectory', 'eslint-loader'],
          include: WEBPACK_COMMON_CONFIG.sourceCode,
          exclude: [/(.|_)min\.js$/]
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
                publicPath: isProd ? '../' : '',
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
                limit: 2096,
                publicPath: isProd ? '../': WEBPACK_COMMON_CONFIG.assetsPublicPath,
                name: isProd ? 'fonts/[name].[hash:7].[ext]' : 'fonts/[name].[ext]'
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
        minify: {
          removeComments: true,
          minifyJS: true,
          collapseWhitespace: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
        // favicon: path.resolve(__dirname, '../favicon.ico')
      }),
      new ScriptExtHtmlWebpackPlugin({
        inline: 'manifest'
      }),
      new PreloadWebpackPlugin({
        rel: 'preload',
        as (entry) {
          if (/\.css$/.test(entry)) return 'style';
          if (/\.woff$/.test(entry)) return 'font';
          if (/\.png$/.test(entry)) return 'image';
          return 'script';
        },
        include: 'allAssets',
        fileWhitelist: [/\.woff/]
      }),
      new webpack.EnvironmentPlugin({
        IP_ADRESS: WEBPACK_COMMON_CONFIG.ip
      })
    ]
  };
};
