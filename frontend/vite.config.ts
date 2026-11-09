import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The résumé data is imported at build time, so `dist/` is pure static output:
// drop it on GitHub Pages, object storage, anywhere. `base: './'` keeps every
// asset URL relative, which makes the same build work at `/`, at
// `/repository-name/` (project pages), or from a file:// preview.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    strictPort: true,
    // the résumé JSON lives outside the frontend root on purpose: one file,
    // shared with the FastAPI dev server.
    fs: {
      allow: ['..'],
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
  },
});
