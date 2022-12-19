/// <reference types="vitest" />
/**
 * @see: https://tinyurl.com/2j464otw
 */
import react from '@vitejs/plugin-react';
import path from 'path';
// import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.tsx'],
    alias: {
      // '@/': path.resolve(__dirname, 'src'),
      // '@/': fileURLToPath(new URL('./src', import.meta.url)),
      '@': path.resolve(__dirname, './src'),
    },
    setupFiles: ['./setupVitest.js'],
  },
});
