import { defineConfig, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    {
      name: "project-jsx-in-js",
      enforce: "pre",
      // Existing application and test source uses JSX in .js files.
      transform(code, id) {
        if (id.includes("/node_modules/") || !/\/src\/.*\.js$/.test(id.split("?")[0])) return null;
        return transformWithOxc(code, id, { lang: "jsx" });
      },
    },
    react(),
  ],
  optimizeDeps: { rolldownOptions: { moduleTypes: { ".js": "jsx" } } },
  test: { globals: true, environment: "jsdom", setupFiles: "./src/setupTests.js" },
});
