# @brickdoc/less-vars-loader

Forked from [@hon2a/less-vars-loader](https://github.com/hon2a/less-vars-loader), and add yarn workspaces supported.

## Use

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.vars\.less$/,
        use: '@brickdoc/less-vars-loader',
        options: {
          transform: ([key, value]) => [camelCase(key), /^\d+px$/.test(value) ? parseInt(value, 10) : value],
          lessOptions: { javascriptEnabled: true }
        }
      }
    ]
  }
}
```

**Note:** This loader needs to go before other loaders matching the `test` if there are any
(e.g. when also using `less-loader` to load other `.less` files).  
