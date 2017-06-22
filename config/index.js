// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
// console.info("assetsRoot", path.resolve(__dirname, '../dist'))
envConfig = {
    dev: {
        biz: require('./biz'),
        env: require('./env.dev'),
        entrances: require("./entrance.js"),
        port: 62222,
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        assetsPublicPath: '/',
        proxyTable: {
            // '/api/common/': {
            //     target: 'http://10.66.1.119:8001',
            //     pathRewrite: {
            //         '^/api/common': '/common',
            //     },
            //     changeOrigin: true,
            // },
            '/api/': {
                // Dev http://10.66.1.119:8002
                // Test http://10.66.1.119:8004
                // PRE http://10.66.140.81:8080
                // target: 'http://10.66.30.66:8009/',
                //target: 'http://10.66.49.51:8001',
                // target: 'http://10.66.150.140:81',
                target: 'http://10.66.30.66:8001', // 测试地址
                // target: 'http://10.66.140.9:8001', // 联调地址
                // target: 'http://10.66.150.135:81', // 生产地址
                pathRewrite: {
                    '^/api': '',
                },
                changeOrigin: true,
            },
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
    },


    test: {
        biz: require('./biz'),
        env: require('./env.test'),
        entrances: require("./entrance.js"),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        assetsPublicPath: '',
        SourceMap: true,
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        Gzip: false,
        GzipExtensions: ['js', 'css'],
        proxyTable: {
            // '/api/common/': {
            //     target: 'http://10.66.1.119:8001',
            //     pathRewrite: {
            //         '^/api/common': '/common',
            //     },
            //     changeOrigin: true,
            // },
            '/api/': {
                // Dev http://10.66.1.119:8002
                // Test http://10.66.1.119:8004
                // PRE http://10.66.140.81:8080
                //target: 'http://10.66.49.51:8001',
                //target: 'http://10.66.49.51:8001',
                // target: 'http://10.66.150.140:81',
                target: 'http://10.66.30.66:8001', // 测试地址
                // target: 'http://10.66.140.9:8001', // 联调地址
                // target: 'http://10.66.150.135:81', // 生产地址
                pathRewrite: {
                    '^/api': '',
                },
                changeOrigin: true,
            },
        },
    },

    production: {
        biz: require('./biz'),
        env: require('./env.production'),
        entrances: require("./entrance.js"),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        proxyTable: {
            '/api/': {
                // target: 'http://10.66.30.66:8001/',
                target: 'http://10.66.150.140:81/',
                pathRewrite: {
                    '^/api': '',
                },
                changeOrigin: true,
            },
        },
        // SourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        // Gzip: false,
        // GzipExtensions: ['js', 'css'],
        // proxyTable: {
        //     biz: require('./biz'),
        //     env: require('./env.production'),
        //     entrances: require("./entrance.js"),
        //     assetsRoot: path.resolve(__dirname, '../dist'),
        //     assetsSubDirectory: '',
        //     proxyTable: {
        //         '/api/': {
        //             target: 'http://10.66.30.66:8001/',
        //             pathRewrite: {
        //                 '^/api': '',
        //             },
        //             changeOrigin: true,
        //         },
        //     }
        // }
    },
    pre: {
        biz: require('./biz'),
        env: require('./env.production'),
        entrances: require("./entrance.js"),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        proxyTable: {
            '/api/': {
                // target: 'http://10.66.30.66:8001/',
                target: 'http://10.66.150.140:81',
                pathRewrite: {
                    '^/api': '',
                },
                changeOrigin: true,
            },
        },
        // SourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        // Gzip: false,
        // GzipExtensions: ['js', 'css'],
        // proxyTable: {
        //     biz: require('./biz'),
        //     env: require('./env.production'),
        //     entrances: require("./entrance.js"),
        //     assetsRoot: path.resolve(__dirname, '../dist'),
        //     assetsSubDirectory: '',
        //     proxyTable: {
        //         '/api/': {
        //             target: 'http://10.66.30.66:8001/',
        //             pathRewrite: {
        //                 '^/api': '',
        //             },
        //             changeOrigin: true,
        //         },
        //     }
        // }
    },
}

module.exports = envConfig[process.env.NODE_ENV]
