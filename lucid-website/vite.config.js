import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcssVite from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcssVite(), // Add the Tailwind CSS Vite plugin here
  ],
  server: {
    port: 3000,
  },
  css: {
    postcss: "./postcss.config.cjs",
  },
});
