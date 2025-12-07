import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Proxy /api requests to Vercel locally if using 'vercel dev', 
  // or just to handle the path gracefully in dev mode.
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Assumes you run `vercel dev`
        changeOrigin: true,
        secure: false,
      }
    }
  }
});