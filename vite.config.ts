import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    proxy: {
      // Proxy API requests starting with /api to the backend server
      '/api': {
        target: 'http://localhost:8000', // Your backend API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix
      },
    },
    cors:true,
    port:3000
  },
});
