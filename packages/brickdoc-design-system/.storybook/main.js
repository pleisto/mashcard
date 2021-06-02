const lessLoaderOptions = {
  lessOptions: {
    javascriptEnabled: true,
    math: 'always',
    strictUnits: false
  }
}
module.exports = {
  core: {
    builder: "webpack5",
  },
  "stories": [
    "../components/**/*.stories.tsx",
    "../components/**/*.stories.mdx",
    "../docs/**/*.stories.mdx"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "typescript": {
    reactDocgen: 'none',
  },
  "webpackFinal": async (config, { _configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    config.module.rules.push(
      {
        test: /\.vars\.less$/,
        use: [ {
          loader: '@brickdoc/less-vars-loader',
          options: lessLoaderOptions
        }],
      }
    );
    config.module.rules.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', {
        loader: 'less-loader',
        options: lessLoaderOptions
      }],
      exclude: /\.(vars)\.less$/
    });

    // Return the altered config
    return config;
  }
}
