import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
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
    chunkSizeWarningLimit: 1024,
    sourcemap: true,
    cssCodeSplit: false,
    target: ['chrome74', 'ios13', 'safari13'],
    rollupOptions: {
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
      lodash: 'lodash-es'
    },
    dedupe: ['react', 'react-dom', 'i18next', 'react-i18next']
  }
})
