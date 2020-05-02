/* eslint-disable */
const path = require('path')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const withImages = require('next-images')
const withTM = require('@weco/next-plugin-transpile-modules')
const withFonts = require('next-fonts')
const withOffline = require('next-offline')

if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {}
}
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './assets/styles/antd-custom.less'),
    'utf8'
  )
)

module.exports = withOffline(
  withFonts(
    withImages(
      withTM({
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: themeVariables, // make your antd custom effective
        },
        poweredByHeader: false,
        transpileModules: [
          'react-native-paper',
          'react-native-safe-area-view',
          'react-native-vector-icons',
        ],
        workboxOpts: {
          swDest: 'static/service-worker.js',
          runtimeCaching: [
            {
              urlPattern: /^https?.*/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'https-calls',
                networkTimeoutSeconds: 15,
                expiration: {
                  maxEntries: 150,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        webpack: (config, { isServer }) => {
          // Fixes npm packages that depend on `fs` module
          config.node = {
            fs: 'empty',
          }
          config.resolve.alias = {
            ...config.resolve.alias,
            'react-native$': 'react-native-web',
          }
          // config.module.rules.push({
          //   test: /\.js$/,
          //   exclude: /node_modules[/\\](?!react-native-paper|react-native-vector-icons|react-native-safe-area-view)/,
          //   use: {
          //     loader: 'babel-loader',
          //     options: {
          //       // The configration for compilation
          //       presets: [
          //         ['@babel/preset-env', { useBuiltIns: 'usage' }],
          //         '@babel/preset-react',
          //         '@babel/preset-flow'
          //       ],
          //       plugins: [
          //         '@babel/plugin-proposal-class-properties',
          //         '@babel/plugin-proposal-object-rest-spread'
          //       ]
          //     }
          //   }
          // })
          if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/
            const origExternals = [...config.externals]
            config.externals = [
              (context, request, callback) => {
                if (request.match(antStyles)) return callback()
                if (typeof origExternals[0] === 'function') {
                  origExternals[0](context, request, callback)
                } else {
                  callback()
                }
              },
              ...(typeof origExternals[0] === 'function' ? [] : origExternals),
            ]

            config.module.rules.unshift({
              test: antStyles,
              use: 'null-loader',
            })
          }

          return config
        },
      })
    )
  )
)
