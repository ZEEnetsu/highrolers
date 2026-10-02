import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Front-end only: `npm run dev` for development, `npm start` to build and preview the
// production bundle. Both serve every route (/contact, /capabilities/…) from index.html.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Keep bundled JS/CSS out of /assets, which holds the brand media from public/
    assetsDir: 'static',
  },
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 4173,
    open: true,
  },
});
