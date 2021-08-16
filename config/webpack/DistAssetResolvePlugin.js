class DistAssetResolvePlugin {
  apply(resolver) {
    resolver.getHook('file').tapAsync('DistAssetResolvePlugin', (request, resolveContext, callback) => {
      const { path } = request
      if (
        !path.includes('/node_modules/') &&
        path.includes('/dist/') &&
        (path.endsWith('.less') || path.endsWith('.css') || path.endsWith('.svg') || path.endsWith('.ttf'))
      ) {
        return resolver.doResolve(
          resolver.ensureHook('final-file'),
          { ...request, path: path.replace('/dist/', '/') },
          null,
          resolveContext,
          callback
        )
      }
      callback()
    })
  }
}

module.exports = DistAssetResolvePlugin
