import browser from 'webextension-polyfill'
import type { TabInfoResponse } from '../types'
import { fetchAuthCookies } from './auth.service'

const NO_TITLE = 'Sem título'

export async function getTabInfo(): Promise<TabInfoResponse> {
  try {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true })
    if (tabs.length === 0) throw new Error('Nenhuma aba ativa encontrada')
    const tab = tabs[0]

    if (!tab.url) return { url: '', title: NO_TITLE }

    if (!tab.url.startsWith('http://') && !tab.url.startsWith('https://')) {
      return { url: '', title: tab.title ?? NO_TITLE }
    }

    return { url: tab.url, title: tab.title ?? NO_TITLE }
  } catch {
    return { url: '', title: NO_TITLE }
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
