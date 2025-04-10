import { resolve } from "path";
import { mergeConfig, defineConfig } from "vite";
import { crx, ManifestV3Export } from "@crxjs/vite-plugin";
import baseConfig, { baseManifest } from "./vite.config.base";

const outDir = resolve(__dirname, "dist_firefox");

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      crx({
        manifest: {
          ...baseManifest,
          background: {
            scripts: ["src/background.ts"],
            type: "module",
          },          
        } as ManifestV3Export,
        browser: "firefox",
        contentScripts: {
          injectCss: true,
        },
      }),
    ],
    build: {
      outDir,
    },
  })
);
