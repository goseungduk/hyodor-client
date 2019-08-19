module.exports = {
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