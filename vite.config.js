import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["pdfjs-dist/build/pdf.worker"],
  }, 
  build: {
    rollupOptions: {
      external: ['pdfjs-dist'],
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000", // so you run `vercel dev` for testing
    },
  },
});
