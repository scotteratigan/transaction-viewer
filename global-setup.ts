// import { FullConfig } from "@playwright/test";

async function globalSetup() {
  // Mock CSS imports by overriding the import hook
  const Module = await import("module");
  Module.createRequire(import.meta.url).extensions[".css"] = () => {};
}

export default globalSetup;
