/*
 * @Author: waghao10
 * @Date: 2023-02-02 10:15:37
 * @Description: umi配置
 */
import { defineConfig } from "umi";
import routes from './config/routes'
const isBuildOnline = process.env.BUILD_ENV === 'prod' || process.env.BUILD_ENV === 'test';
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const prodGzipList = ['js', 'css'];

export default defineConfig({
  npmClient: 'npm',
  hash: true,
  title: '手机管理系统',
  history: {
    type: 'hash',
  },
  // links: [
  //   { rel: 'icon', href: './favicon.ico' }
  // ],
  favicons: [
    '/favicon.ico'
  ],
  plugins: ['@umijs/plugins/dist/dva'],
  dva: {},
  define: {
    SITE_USER: isBuildOnline ? true : false
  },
  proxy: {
    '/vzy': {
      target:'localhost:33956',
      changeOrigin: true,
      secure: false,
      proxyTimeout: 1000 * 60 * 60 * 1,
      timeout: 1000 * 60 * 60 * 1,
    },
  },
  routes: [...routes],
  chainWebpack(config: any) {
    if (isBuildOnline) {
      config.merge({
        optimization: {
          splitChunks: {
            chunks: 'all',
            minSize: 10000,
            minChunks: 2,
            automaticNameDelimiter: '.',
            // 表示按需加载文件时，并行请求的最大数目。默认为5。
            maxAsyncRequests: 5,
            // 表示加载入口文件时，并行请求的最大数目。默认为3。
            maxInitialRequests: 3,
            cacheGroups: {
              antd: {
                chunks: 'async',
                name: 'antd',
                test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
                priority: 110
              },
              common: {
                name: 'common',
                chunks: 'all',
                test: /(rc-select|rc-tigger|rc-field-form|rc-menu|rc-table|rc-util|rc-picker|rc-tree)/,
                priority: 100,
                enforce: true
              },
              others: {
                name: 'others',
                chunks: 'all',
                test: /(moment|lottie-web)/,
                priority: 100,
                enforce: true
              },
              async: {
                chunks: 'async',
                minChunks: 2,
                name: 'async',
                priority: 9,
              }
            }
          }
        },
      });
      // 可以有效减小moment体积
      config
        .plugin('replace')
        .use(require('webpack').ContextReplacementPlugin)
        .tap(() => {
          return [/moment[/\\]locale$/, /zh-cn/];
        });
      // 代码压缩，nginx会优先找压缩的文件资源
      config.plugin('compression-webpack-plugin').use(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + prodGzipList.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.6,
          deleteOriginalAssets: false, // 不删除源文件
        }),
      );
    }
  },
});
