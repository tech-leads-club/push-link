import { resolve } from "path";
import { mergeConfig, defineConfig } from "vite";
import { crx, ManifestV3Export } from "@crxjs/vite-plugin";
import baseConfig, { baseManifest } from "./vite.config.base";

const outDir = resolve(__dirname, "dist_chrome");

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      crx({
        manifest: {
          ...baseManifest,
          background: {
            service_worker: "src/background.ts",
            type: "module",
          },
        } as ManifestV3Export,
        browser: "chrome",
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