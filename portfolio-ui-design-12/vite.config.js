import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite 8 uses Rolldown; allow its default splitting rather than the removed object-form manualChunks.
export default defineConfig({ plugins: [react()] });
