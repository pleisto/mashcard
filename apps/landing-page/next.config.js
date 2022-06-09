/** @type {import('next').NextConfig} */

const packageJson = require('./package.json')
const transpiledPackages = Object.keys(packageJson.dependencies).filter(it => it.startsWith('@brickdoc/'))
transpiledPackages.push('swiper')
const withTM = require('next-transpile-modules')(transpiledPackages)

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.mp4$/,
      type: 'asset/resource'
    })
    return config
  }
})