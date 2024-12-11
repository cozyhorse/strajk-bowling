import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./test-setup.js",
    provider: "v8",
    coverage:{
      reportsDirectory: "./coverage",
      reporter: ["text", "json", "lcov", "json-summary"],
      all: true,
      exclude: ["./src/main.jsx", "./vite.config.js"],
    }
  }
})

