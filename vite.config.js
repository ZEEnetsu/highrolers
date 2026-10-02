import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react() , tailwindcss()],
  build: {
    // Keep bundled JS/CSS out of /assets, which holds the brand media from public/
    assetsDir: 'static',
  },
  server: {
    port: 5173,
    open: true,
  },
});
