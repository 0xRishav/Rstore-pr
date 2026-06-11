/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test-setup.js",
    globals: true,
  },
  server: {
    port: 3000,
  },
});
