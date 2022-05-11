# @brickdoc/build-support

Build toolings & utilities for the Brickdoc web App.

## Commands

- `yarn build` - Build the web app and put the artifacts in `<monorepo>/public/esm-bundle`, which will be consumed by `@brickdoc/server-api` in production mode.

## NestJS Module

The `WebAppModule` module integrates Vite Dev Server into NestJS apps. When we run the NestJS application in development mode, we will get a Vite Dev Server instance running as a Nest middleware.

Forget `vite` command, all we need is just starting the nest app as usual!
