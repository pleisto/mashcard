import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import swc from 'unplugin-swc'
import { visualizer } from 'rollup-plugin-visualizer'
import { WEB_APP_ENTRYPOINT } from './web-app/web-app.constants'

const monorepoRoot = path.resolve(__dirname, '../../..')

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  root: monorepoRoot,
  publicDir: false, // We serve public dir from our own nestjs app, not using vite's public dir
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy']
        }
      }
    }),
    VitePWA({
      injectRegister: 'script',
      manifest: {
        name: 'Brickdoc',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{woff,woff2,ttf,js,svg,mp4,jpg,png,webp,webm,mov}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/s3\.brickdoc\.com\/npmjs\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'brickdoc-npmjs-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          },
          {
            urlPattern: /^https:\/\/s3\.brickdoc\.com\/webfonts\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'brickdoc-webfonts-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          }
        ]
      }
    }),
    swc.vite(),
    process.env.BUNDLE_STATS
      ? visualizer({
          brotliSize: true,
          filename: './tmp/esm-bundle-stats.html'
        })
      : undefined
  ],
  build: {
    outDir: 'public/esm-bundle',
    chunkSizeWarningLimit: 1024,
    sourcemap: true,
    minify: 'esbuild',
    cssCodeSplit: false,
    target: ['chrome74', 'ios13', 'safari13'],
    manifest: true,
    rollupOptions: {
      input: path.resolve(monorepoRoot, WEB_APP_ENTRYPOINT),
      output: {
        manualChunks: {
          common: ['react', 'react-dom', '@brickdoc/active-support', 'i18next', '@apollo/client', 'yup'],
          telemetry: ['@sentry/react', '@sentry/tracing', '@sentry/integrations'],
          'design-system': ['@brickdoc/design-system', '@brickdoc/design-icons', 'framer-motion']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['dayjs', 'yup', 'lodash-es', 'framer-motion', 'yup']
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(monorepoRoot, 'apps/client-web/src')}/`,
      lodash: 'lodash-es'
    },
    dedupe: ['react', 'react-dom', 'i18next', 'react-i18next']
  }
})
