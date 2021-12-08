import { defineConfig, UserConfigExport } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from 'vite-plugin-mdx'

export default defineConfig({
  jsx: 'react',
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy']
        }
      }
    }),
    mdx()
  ],
  server: {
    port: 6006,
    open: true
  },
  build: {
    outDir: 'storybook-static',
    chunkSizeWarningLimit: 1024
  },
  optimizeDeps: {
    include: ['dayjs', 'react', 'react-dom']
  }
} as unknown as UserConfigExport)
