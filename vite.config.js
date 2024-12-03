import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tscPlugin } from 'vite-plugin-tsc-watch'

export default defineConfig((env) => ({
  build: { outDir: 'build' },
  plugins: [tscPlugin(), react()],
}))
