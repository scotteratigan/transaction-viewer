import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./", // Root directory to include multiple test directories
  projects: [
    {
      name: "Client Integration Tests",
      testDir: "./integration",
    },
  ],
  webServer: {
    command: "npm run dev", // Start both development servers
    port: 5173, // note: alternate service also needs to run on port 4000
  },
  use: {
    baseURL: "http://localhost:5173",
    launchOptions: {
      headless: true,
    },
  },
  reporter: "html",
});
