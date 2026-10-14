import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      fileName: () => "status-card.js",
      formats: ["es"], // Home Assistant loads cards as ES modules
    },
  },
});
