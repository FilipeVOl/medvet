/// <reference types="vitest" />
///<reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.js',
    coverage: {
      provider: 'istanbul', // or 'v8'
    },
  }

})
