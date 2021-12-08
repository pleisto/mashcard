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
    VitePWA({})
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
