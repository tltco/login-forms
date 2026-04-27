import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./app/__tests__/setup.ts"],
    include: ["./app/**/*.test.{ts,tsx}"],
    css: false,
  },
  resolve: {
    alias: {
      "~": "/app",
    },
  },
});
