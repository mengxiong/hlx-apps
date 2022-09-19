import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/hlx/',
  root: '.',
  plugins: [svgr({ exportAsDefault: true }), react()],
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
      '@hlx/frame': resolve(__dirname, '../../libs/frame/index.ts'),
      '@hlx/components': resolve(__dirname, '../../libs/components/index.ts'),
    },
  },
  server: {
    port: 3010,
    proxy: {
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
