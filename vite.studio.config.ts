import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  root: fileURLToPath(new URL('./studio', import.meta.url)),
  publicDir: fileURLToPath(new URL('./public', import.meta.url)),
  plugins: [react()],
  css: { postcss: { plugins: [] } },
  server: { host: '0.0.0.0' },
  build: { outDir: '../dist-studio', emptyOutDir: true },
})
