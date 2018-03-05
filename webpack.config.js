//npm i --save-dev react react-dom autoprefixer babel-core babel-eslint babel-loader babel-plugin-syntax-dynamic-import babel-plugin-transform-async-to-generator babel-plugin-transform-object-rest-spread babel-preset-es2015 babel-preset-react buffer-loader chromedriver classnames copy-webpack-plugin css-loader enzyme enzyme-adapter-react-16 es6-object-assign eslint eslint-config-scratch eslint-plugin-import eslint-plugin-react file-loader get-float-time-domain-data get-user-media-promise gh-pages html-webpack-plugin immutable jest lodash.bindall lodash.debounce lodash.defaultsdeep lodash.isequal lodash.omit lodash.pick minilog mkdirp platform postcss-import postcss-loader postcss-simple-vars prop-types raf raw-loader react-contextmenu react-draggable react-ga react-intl react-intl-redux react-modal react-redux react-responsive react-style-proptype react-tabs react-test-renderer react-tooltip redux redux-mock-store redux-throttle rimraf scratch-audio scratch-blocks scratch-l10n scratch-paint scratch-render scratch-storage scratch-vm@0.1.0-prerelease.1519944523-prerelease.1519944542 selenium-webdriver@3 startaudiocontext style-loader svg-to-image text-encoding wav-encoder web-audio-test-api webpack@3 webpack-dev-server@2 xhr
var path = require('path');
var webpack = require('webpack');

// Plugins
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// PostCss
var autoprefixer = require('autoprefixer');
var postcssVars = require('postcss-simple-vars');
var postcssImport = require('postcss-import');

module.exports = {
    devServer: {
        disableHostCheck: true,
        contentBase: path.resolve(__dirname, 'build'),
        host: '0.0.0.0',
        port: process.env.PORT || 8500
    },
    // devtool: 'cheap-module-source-map',
    entry: {
        index: './src/index.js',
        lib: ['react', 'react-dom'],
        gui: './src/index.jsx',
        // blocksonly: './src/examples/blocks-only.jsx',
        // compatibilitytesting: './src/examples/compatibility-testing.jsx',
        // player: './src/examples/player.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js?[hash]'
    },
    externals: {
        React: 'react',
        ReactDOM: 'react-dom'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: path.resolve(__dirname, 'src')
        },
        {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    camelCase: true
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: function () {
                        return [
                            postcssImport,
                            postcssVars,
                            autoprefixer({
                                browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8']
                            })
                        ];
                    }
                }
            }]
        },
        {
            test: /\.(svg|png|wav)$/,
            loader: 'file-loader'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"',
            'process.env.DEBUG': Boolean(process.env.DEBUG)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lib',
            filename: 'lib.min.js'
        }),
        new HtmlWebpackPlugin({
            chunks: ['lib', 'gui', 'index'],
            template: 'src/index.ejs',
            title: '啃萝卜平台 - Make it easy!'
        }),
        // new HtmlWebpackPlugin({
        //     chunks: ['lib', 'blocksonly'],
        //     template: 'src/index.ejs',
        //     filename: 'blocks-only.html',
        //     title: 'Scratch 3.0 GUI: Blocks Only Example'
        // }),
        // new HtmlWebpackPlugin({
        //     chunks: ['lib', 'compatibilitytesting'],
        //     template: 'src/index.ejs',
        //     filename: 'compatibility-testing.html',
        //     title: 'Scratch 3.0 GUI: Compatibility Testing'
        // }),
        // new HtmlWebpackPlugin({
        //     chunks: ['lib', 'player'],
        //     template: 'src/index.ejs',
        //     filename: 'player.html',
        //     title: 'Scratch 3.0 GUI: Player Example'
        // }),
        new CopyWebpackPlugin([{
            from: 'static',
            to: 'static'
        }]),
        new CopyWebpackPlugin([{
            from: 'node_modules/scratch-blocks/media',
            to: 'static/blocks-media'
        }]),
        // new CopyWebpackPlugin([{
        //     from: 'node_modules/scratch-vm/dist/node/assets',
        //     to: 'static/extension-assets'
        // }]),
        new CopyWebpackPlugin([{
            from: 'extensions/**',
            to: 'static',
            context: 'src/examples'
        }]),
        new CopyWebpackPlugin([{
            from: 'extension-worker.{js,js.map}',
            context: 'node_modules/scratch-vm/dist/web'
        }])
    ].concat(process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.UglifyJsPlugin({
            // include: /\.min\.js$/,
            minimize: true
        })
    ] : [])
};
