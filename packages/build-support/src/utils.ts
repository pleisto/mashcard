import { env } from 'process'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { WEB_APP_ENTRYPOINT } from './web-app/web-app.constants'

/**
 * Enable HTTPS for local development, with a self-signed certificate.
 * Many HTTP secure headers only works under HTTPS.
 */
export const http2DevServerConfig = {
  http2: true,
  https: {
    allowHTTP1: true,
    cert: env.SELF_SIGNED_CERTIFICATE_FOR_DEV,
    key: env.SELF_SIGNED_PRIVATE_KEY_FOR_DEV
  }
}

const findEntrypointInManifest = (file: string): string => {
  try {
    const manifest = readFileSync(resolve(__dirname, '../../../public/esm-bundle/manifest.json'), 'utf8')
    return `/esm-bundle/${JSON.parse(manifest)[file]?.file}`
  } catch (e) {
    return `/${WEB_APP_ENTRYPOINT}`
  }
}

export const webAppEntrypointUrl =
  env.NODE_ENV === 'development' ? `/${WEB_APP_ENTRYPOINT}` : `${findEntrypointInManifest(WEB_APP_ENTRYPOINT)}`
