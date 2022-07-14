#!/usr/bin/env node
/**
 * @file Copy pdftron static assets to the public folder.
 * @see {@link https://www.pdftron.com/documentation/web/get-started/npm/#2-copy-static-assets}
 */
const fs = require('fs-extra')
const { resolve } = require('node:path')

const monorepoRoot = resolve(__dirname, '../../..')
const srcDir = resolve(monorepoRoot, './node_modules/@pdftron/webviewer/public')
const targetDir = resolve(monorepoRoot, './apps/client-web/src/public/pdftron')

fs.copySync(srcDir, targetDir)
