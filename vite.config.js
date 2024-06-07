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
    reporters: ['html'],
    coverage: {
      provider: 'istanbul', // or 'v8'
      reporter: ['html'],
      reportsDirectory: './coverage',
      extension: ['ts', 'tsx', 'js', 'jsx'],
      enabled: true,
      include: './src/tests/agendamentos.spec.js',
    },
  }

})
