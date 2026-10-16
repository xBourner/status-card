import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "status-card.js",
    },
    outDir: "dist",
    rolldownOptions: {
      output: {
        codeSplitting: false,
      },
    },
  },
});
