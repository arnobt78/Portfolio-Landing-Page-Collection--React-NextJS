/**
 * Vite config - React + Tailwind v4 build setup.
 * @see https://vite.dev/config/
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("three") ||
              id.includes("@react-three") ||
              id.includes("maath")
            ) {
              return "three";
            }
            if (id.includes("motion") || id.includes("framer-motion")) {
              return "motion";
            }
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 850,
  },
});
