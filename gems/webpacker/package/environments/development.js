const { merge } = require('webpack-merge')

const baseConfig = require('./base')
const devServer = require('../dev_server')
const { runningWebpackDevServer } = require('../env')

const { outputPath: contentBase, publicPath } = require('../config')

let devConfig = {
  mode: 'development',
  devtool: 'cheap-module-source-map'
}

if (runningWebpackDevServer) {
  if (devServer.hmr) {
    devConfig = merge(devConfig, {
      output: { filename: '[name]-[fullhash].js' }
    })
  }

  devConfig = merge(devConfig, {
    cache: {
      type: 'filesystem'
    },
    snapshot: {
      buildDependencies: { timestamp: true, hash: true }
    },
    devServer: {
      compress: devServer.compress,
      allowedHosts: devServer.allowed_hosts,
      host: devServer.host,
      port: devServer.port,
      https: devServer.https,
      hot: devServer.hmr,
      historyApiFallback: { disableDotRule: true },
      headers: devServer.headers,
      client: {
        overlay: devServer.client.overlay,
        progress: devServer.client.progress,
        webSocketURL: {
          hostname: devServer.client.webSocketURL.hostname,
          port: devServer.client.webSocketURL.port
        }
      },
      devMiddleware: {
        publicPath,
        stats: {
          colors: true,
          entrypoints: false,
          errorDetails: true,
          modules: false,
          moduleTrace: false
        }
      },
      static: {
        directory: contentBase,
        watch: devServer.watch_options
      }
    }
  })
}

module.exports = merge(baseConfig, devConfig)
