import { crx, ManifestV3Export } from '@crxjs/vite-plugin'
import { defineConfig, mergeConfig } from 'vite'
import baseConfig, { baseManifest } from './vite.config.base'

interface BrowserConfigOptions {
  browser: 'chrome-edge' | 'firefox'
  outDir: string
}

export function createBrowserConfig({ browser, outDir }: BrowserConfigOptions) {
  const background =
    browser === 'chrome-edge'
      ? { service_worker: 'src/background.ts', type: 'module' }
      : { scripts: ['src/background.ts'], type: 'module' }

  return mergeConfig(
    baseConfig,
    defineConfig({
      plugins: [
        crx({
          manifest: { ...baseManifest, background } as ManifestV3Export,
          browser: browser === 'chrome-edge' ? 'chrome' : browser,
          contentScripts: { injectCss: true },
        }),
      ],
      build: { outDir },
      server: { hmr: false },
    }),
  )
}
