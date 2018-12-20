/**
 * webpack 生产环境配置
 * @author luyanhong 2018-12-20
*/
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.base.config');
const { WEBPACK_PROD_CONFIG } = require('../config');
module.exports = (env) => {
  const config = {
    mode: 'production',
    output: {
      filename: 'js/[name].[chunkhash:7].js',
      path: WEBPACK_PROD_CONFIG.assetsDirectory,
      publicPath: WEBPACK_PROD_CONFIG.assetsPublicPath,
      chunkFilename: 'js/[name].[chunkhash:7].js'
    },
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: {
              drop_console: true
            },
            output: {
              comments: false
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            safe: true,
            autoprefixer: {
              remove: false
            }
          }
        })
      ],
      hashedModuleIds: true
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:7].css'
      })
    ]
  };
  if (process.env.npm_config_report) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  return merge(baseConfig(env), config);
};

