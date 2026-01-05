import browser from 'webextension-polyfill'
import { sanitizeTitle } from '../helpers/title'
import type { TabInfoResponse } from '../types'
import { fetchAuthCookies } from './auth.service'

export async function getTabInfo(): Promise<TabInfoResponse> {
  try {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true })
    if (tabs.length === 0) return { url: undefined, title: undefined }

    const tab = tabs[0]

    const title = sanitizeTitle(tab.title)

    if (!tab.url) return { url: undefined, title }

    if (!tab.url.startsWith('http://') && !tab.url.startsWith('https://')) {
      return { url: undefined, title }
    }

    return { url: tab.url, title }
  } catch {
    return { url: undefined, title: undefined }
  }
}

export async function handleTabUpdate(tabId: number, changeInfo: browser.Tabs.OnUpdatedChangeInfoType): Promise<void> {
  if (changeInfo.status !== 'complete') return
  try {
    const tab = await browser.tabs.get(tabId)
    if (!tab.url) throw new Error('URL da aba não encontrada')
    const cookieResponse = await fetchAuthCookies()
    if (!cookieResponse.success) throw new Error('Falha ao obter cookies de autenticação')
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Erro ao processar atualização da aba')
  }
}
