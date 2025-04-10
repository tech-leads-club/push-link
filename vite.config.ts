import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "src/extension/manifest.json", dest: "." },
        { src: "src/extension/public/16.png", dest: "./public" },
        { src: "src/extension/public/32.png", dest: "./public" },
        { src: "src/extension/public/48.png", dest: "./public" },
        { src: "src/extension/public/192.png", dest: "./public" },
        { src: "src/extension/public/logo.png", dest: "./public" },
      ],
    }),
  ],
  server: {
    open: "/popup-local.html",
  },
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "popup.html"),
        options: resolve(__dirname, "options.html"),
        background: resolve(__dirname, "src/background.ts"),
        content: resolve(__dirname, "src/content.ts"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});