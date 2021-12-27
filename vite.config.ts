/* eslint-disable import/no-default-export */
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

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
      manifest: {
        name: 'BrickDoc',
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
        globPatterns: ['**/*.{woff,woff2,ttf,js,svg,mp4,jpg,png}']
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 1024,
    sourcemap: false,
    cssCodeSplit: false,
    target: ['chrome74', 'ios13']
  },
  optimizeDeps: {
    include: ['dayjs', 'react', 'react-dom']
  }
})
