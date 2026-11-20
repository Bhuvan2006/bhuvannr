import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: false },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['gsap', 'lenis', 'framer-motion'],
          blog: ['katex', 'marked'],
        },
      },
    },
  },
});
