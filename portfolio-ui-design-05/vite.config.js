/**
 * Vite config: React + Tailwind 4. Build uses manualChunks to split vendor bundles
 * (React, Three.js, GSAP) for better caching; chunkSizeWarningLimit raised for the large Three bundle.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('/three/') || id.includes('/@react-three/')) return 'vendor-three';
          if (id.includes('/gsap/') || id.includes('/@gsap/')) return 'vendor-gsap';
          if (id.includes('/react/') || id.includes('/react-dom/')) return 'vendor-react';
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
});
