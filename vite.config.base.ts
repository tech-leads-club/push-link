import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { ManifestV3Export } from "@crxjs/vite-plugin";
import { resolve } from "path";
import manifest from "./manifest.json";
import pkg from "./package.json";

export const baseManifest = {
  ...manifest,
  version: pkg.version,    
} as ManifestV3Export;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "./public/16.png", dest: "./public" },
        { src: "./public/32.png", dest: "./public" },
        { src: "./public/48.png", dest: "./public" },
        { src: "./public/192.png", dest: "./public" },
        { src: "./public/logo.png", dest: "./public" },
      ],
    }),
  ],
  publicDir: resolve(__dirname, "public"),
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