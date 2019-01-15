const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  }
};