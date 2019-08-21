const path = require('path');

module.exports = {
    assetsDir: '../static',
    baseUrl: '',
    publicPath: undefined,
    outputDir: path.resolve(__dirname, './dist/templates'),
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined,
    css: undefined,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://api.korea.go.kr/openapi',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}