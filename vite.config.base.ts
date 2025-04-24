import { ManifestV3Export } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import tsconfigPaths from 'vite-tsconfig-paths'
import manifest from './manifest.json'
import pkg from './package.json'

export const baseManifest = {
  ...manifest,
  version: pkg.version,
} as ManifestV3Export

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        { src: './public/16.png', dest: './public' },
        { src: './public/32.png', dest: './public' },
        { src: './public/48.png', dest: './public' },
        { src: './public/192.png', dest: './public' },
        { src: './public/logo.png', dest: './public' },
        { src: './public/array.js', dest: './public' },
      ],
    }),
  ],
  publicDir: resolve(__dirname, 'public'),
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        options: resolve(__dirname, 'options.html'),
      },
      output: { entryFileNames: '[name].js' },
    },
  },
})
