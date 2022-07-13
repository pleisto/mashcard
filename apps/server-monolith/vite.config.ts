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
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        globPatterns: ['**/*.{woff,woff2,ttf,js,css,svg,mp4,jpg,png,webp,webm,mov}'],
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
            urlPattern: /^https:\/\/s3\.brickapis\.com\/webfonts\/.*/i,
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
    sourcemap: true
  },
  resolve: {
    alias: {
      lodash: 'lodash-es',
      plugins: join(__dirname, '../../plugins')
    }
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
