module.exports = {
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react', ['@babel/preset-typescript', { allowDeclareFields: true }]],
      plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
    }
  }
}
