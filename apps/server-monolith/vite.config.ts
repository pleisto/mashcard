/**
 * TODO: delete me after rails project retired
 */
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { join } from 'node:path/posix'
import swc from 'unplugin-swc'
import { visualizer } from 'rollup-plugin-visualizer'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    RubyPlugin(),
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
        name: 'MashCard',
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
              cacheName: 'mashcard-npmjs-cache',
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
              cacheName: 'mashcard-webfonts-cache',
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
    chunkSizeWarningLimit: 1024,
    sourcemap: true,
    target: ['chrome74', 'ios13', 'safari13'],
    rollupOptions: {
      output: {
        manualChunks: {
          vendor1: ['react', 'react-dom', '@apollo/client'],
          vendor2: ['i18next', 'react-i18next', 'yup', 'dayjs', 'framer-motion'],
          vendor3: ['chevrotain', 'refractor', 'lodash-es'],
          vendor4: ['yjs', '@tiptap/core', '@tiptap/react'],
          vendor5: ['rc-dropdown', 'rc-select', 'rc-tabs', 'rc-trigger', 'rc-virtual-list', '@uiw/react-split'],
          vendor6: ['react-vega'],
          telemetry: ['@sentry/react', '@sentry/tracing', '@sentry/integrations'],
          common: [
            '@mashcard/active-support',
            '@mashcard/design-system',
            '@mashcard/design-icons',
            '@mashcard/schema',
            '@mashcard/test-helper'
          ],
          editor: ['@mashcard/editor'],
          formula: ['@mashcard/formula'],
          uploader: ['@mashcard/uploader']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['dayjs', 'yup', 'lodash-es', 'framer-motion', 'yup']
  },
  resolve: {
    alias: {
      lodash: 'lodash-es',
      plugins: join(__dirname, '../../plugins')
    },
    dedupe: ['react', 'react-dom', 'i18next', 'react-i18next']
  },
  server: {
    fs: {
      allow: [
        // Define correct path for monorepo
        searchForWorkspaceRoot(join(process.cwd(), '..', '..'))
      ]
    }
  }
})
