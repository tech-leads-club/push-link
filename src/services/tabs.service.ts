import browser from 'webextension-polyfill'
import type { TabInfoResponse } from '../types'
import { notifyUserLoggedIn, requestAuthToken } from './auth.service'
import { showNotification } from './notification.service'

export async function getTabInfo(): Promise<TabInfoResponse> {
  try {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true })
    if (tabs.length === 0) return { error: 'Nenhuma aba ativa encontrada' }
    const tab = tabs[0]
    return { url: tab.url, title: tab.title }
  } catch (error) {
    return {
      error: `Erro ao obter informações da aba: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

export async function handleTabUpdate(tabId: number, changeInfo: browser.Tabs.OnUpdatedChangeInfoType): Promise<void> {
  if (changeInfo.status !== 'complete') return
  try {
    const tab = await browser.tabs.get(tabId)

    if (!tab.url) {
      await showNotification('URL da aba não encontrada', 'warning')
      return
    }

    const tokenResponse = await requestAuthToken()

    if (!tokenResponse.success) {
      await showNotification('Falha ao obter token de autenticação', 'error')
      return
    }

    await notifyUserLoggedIn()
  } catch {
    await showNotification('Erro ao processar atualização da aba', 'error')
  }
}
