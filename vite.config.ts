import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Maps the Node.js process.env.API_KEY (used by Google SDK) to the Vite environment variable.
    // Ensure you set VITE_GOOGLE_API_KEY in Vercel if/when you switch to Gemini.
    'process.env.API_KEY': 'import.meta.env.VITE_GOOGLE_API_KEY'
  }
});