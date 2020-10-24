// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        host: 'localhost',
        port: 8082,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        //包括静态文件（static/img/sun.jpg）都会变成去访问target
        proxyTable: {
            '/summer': {
                target: 'http://localhost/',
                // target: 'http://192.168.1.112/',
                changeOrigin: true, // 允许跨域
                pathRewrite: {
                    '^/summer': '/'
                }
            }
        },
        cssSourceMap: false
    }
};
