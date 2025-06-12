import browser from 'webextension-polyfill'
import { showNotification } from '../services/notification.service'
import { getTabInfo } from '../services/tabs.service'
import { removeMarketingParams } from './url'
import { PageData, PageMetadata } from '../types'

export async function getCurrentPageData(): Promise<PageData | null> {
  try {
    const { url, title } = await getTabInfo()
    const cleanedUrl = removeMarketingParams(url)
    const result: PageData = { url: cleanedUrl, title }
    const tabs = await browser.tabs.query({ active: true, currentWindow: true })

    if (tabs.length === 0 || !tabs[0].id) {
      await showNotification('Não foi possível acessar a aba atual', 'error')
      return result
    }

    try {
      const scriptResults = await browser.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: extractPageMetadata,
      })

      if (scriptResults && scriptResults.length > 0) {
        const [metadata] = scriptResults
        const metaResult = metadata.result as PageMetadata

        result.title = metaResult.ogTitle ?? metaResult.twitterTitle ?? result.title

        if (metaResult.ogDescription || metaResult.twitterDescription) {
          result.description = metaResult.ogDescription ?? metaResult.twitterDescription
        }

        const metaImageUrl = metaResult.ogImage ?? metaResult.twitterImage
        if (metaImageUrl) result.imageUrl = metaImageUrl
      }
    } catch {
      await showNotification('Erro ao extrair metadados da página', 'error')
    }

    return result
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    await showNotification(`${errorMessage}`, 'error')
    return null
  }
}

export function extractPageMetadata() {
  const query = (selector: string, attribute = 'content') =>
    document.querySelector(selector)?.getAttribute(attribute) ?? ''
  return {
    ogTitle: query('meta[property="og:title"]'),
    ogDescription: query('meta[property="og:description"]'),
    ogImage: query('meta[property="og:image"]'),
    ogUrl: query('meta[property="og:url"]'),
    ogSiteName: query('meta[property="og:site_name"]'),
    ogType: query('meta[property="og:type"]'),
    twitterTitle: query('meta[name="twitter:title"]'),
    twitterDescription: query('meta[name="twitter:description"]'),
    twitterImage: query('meta[name="twitter:image"]'),
    twitterCard: query('meta[name="twitter:card"]'),
    description: query('meta[name="description"]'),
    keywords: query('meta[name="keywords"]'),
    author: query('meta[name="author"]'),
    title: document.title,
    canonicalUrl: query('link[rel="canonical"]', 'href'),
  }
}
