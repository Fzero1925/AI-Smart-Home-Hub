import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // Using '.' instead of process.cwd() avoids type errors if Node types are missing.
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // This ensures that `process.env.API_KEY` in your code is replaced 
      // with the actual value from Vercel environment variables during build.
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});