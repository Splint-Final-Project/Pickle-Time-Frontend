import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@/', replacement: path.resolve(__dirname) },
      { find: '@/apis', replacement: path.resolve(__dirname, 'src/apis') },
      { find: '@/assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@/components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@/constants', replacement: path.resolve(__dirname, 'src/constants') },
      { find: '@/hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@/mocks', replacement: path.resolve(__dirname, 'src/mocks') },
      { find: '@/layouts', replacement: path.resolve(__dirname, 'src/layouts') },
      { find: '@/pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@/styles', replacement: path.resolve(__dirname, 'src/styles') },
      { find: '@/utils', replacement: path.resolve(__dirname, 'src/utils') },
    ],
  },
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
      },
    },
  },
});
