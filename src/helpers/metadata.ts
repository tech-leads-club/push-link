import browser from 'webextension-polyfill'
import { showNotification } from '../services/notification.service'
import { getTabInfo } from '../services/tabs.service'
import { PageData, PageMetadata } from '../types'

const PERMISSION_ERROR = ['Cannot access', 'scripting', 'permission']

export async function getCurrentPageData(): Promise<PageData | null> {
  try {
    const { url, title } = await getTabInfo()
    const result: PageData = { url, title }

    if (!url) {
      await showNotification('URL não detectada. Por favor, preencha os campos manualmente.', 'info')
      return result
    }

    const tabs = await browser.tabs.query({ active: true, currentWindow: true })

    if (tabs.length === 0 || !tabs[0].id) {
      await showNotification('Não foi possível acessar a aba atual. Você pode editar manualmente os campos.', 'info')
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
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      const isPermissionRelatedError = PERMISSION_ERROR.some((term) => errorMessage.includes(term))

      if (isPermissionRelatedError) {
        await showNotification(
          'Este site pode limitar o acesso a metadados. Você pode editar manualmente os campos.',
          'info',
        )
      } else {
        await showNotification(
          'Não foi possível extrair todos os metadados. Você pode editar manualmente os campos.',
          'info',
        )
      }
    }

    if (!result.title || result.title.trim() === '') {
      result.title = ''
    }

    return result
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    await showNotification(`${errorMessage}. Por favor, preencha os campos manualmente.`, 'error')
    return { url: '', title: '' }
  }
}

export function extractPageMetadata() {
  const query = (selector: string, attribute = 'content') =>
    document.querySelector(selector)?.getAttribute(attribute) ?? ''

  const getTitle = () => {
    const documentTitle = document.title
    const ogTitle = query('meta[property="og:title"]')
    const twitterTitle = query('meta[name="twitter:title"]')

    const h1Title = document.querySelector('h1')?.textContent?.trim()
    const headerTitle = document.querySelector('header h1, header h2, header .title')?.textContent?.trim()
    const metaTitle = query('meta[name="title"]')
    const itempropTitle = query('meta[itemprop="name"]')

    return documentTitle || ogTitle || twitterTitle || h1Title || headerTitle || metaTitle || itempropTitle || ''
  }

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
    title: getTitle(),
    canonicalUrl: query('link[rel="canonical"]', 'href'),
  }
}
