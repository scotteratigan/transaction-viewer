import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { configDefaults } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../dist/client", // output directory
  },
  test: {
    globals: true, // Enable global test functions like `test`
    environment: "jsdom", // Simulate a browser environment
    setupFiles: "./test/setup.ts", // Optional: Add setup file if needed
    exclude: [...configDefaults.exclude, "**/node_modules/**"],
  },
});
