import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const clientWebPackageRoot = resolve(__dirname, '../../apps/client-web')
const serverMonolithPackageRoot = resolve(__dirname, '../../apps/server-monolith')

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'MashCard',
        short_name: 'MashCard',
        description: 'An open-source web-based OS and no-code PaaS to boost productivity.',
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
        globPatterns: ['**/*.{html,css,js,json,txt,woff,woff2,ttf,svg,ico,jpg,png,heif,webp,mp4,webm,mov}'],
        // Requests starting with '$'/'.' are usually backend-related requests, so we bypass them
        navigateFallbackDenylist: [/^\/(\$|\.)/],
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
    process.env.BUNDLE_STATS
      ? visualizer({
          brotliSize: true,
          filename: './tmp/esm-bundle-stats.html'
        })
      : undefined
  ],
  build: {
    sourcemap: true,
    outDir: `${serverMonolithPackageRoot}/public`,
    emptyOutDir: true,
    rollupOptions: {
      external: ['./$server-context.js']
    }
  },
  resolve: {
    alias: {
      '@/': `${clientWebPackageRoot}/src/`,
      lodash: 'lodash-es',
      plugins: resolve(__dirname, '../../plugins')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '^/(\\$|\\.)': {
        target: 'http://localhost:3036',
        ws: true
      }
    }
  }
})
