import browser from 'webextension-polyfill'
import { isValidRequest } from './helpers/request'
import { fetchAuthCookies } from './services/auth.service'
import { showNotification } from './services/notification.service'
import { handleTabUpdate } from './services/tabs.service'

browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  try {
    await handleTabUpdate(tabId, changeInfo)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    await showNotification(`Erro ao processar atualização da aba: ${errorMessage}`, 'error')
  }
})

browser.runtime.onInstalled.addListener(async () => {
  await showNotification('Tech Leads Club - Links Share extension instalado com sucesso!', 'info')
})

browser.runtime.onMessage.addListener((request: unknown, _sender, sendResponse) => {
  ;(async () => {
    try {
      if (isValidRequest(request, 'getCookie')) {
        const response = await fetchAuthCookies()
        sendResponse(response)
      } else {
        sendResponse({ success: false, error: 'Invalid request' })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      await showNotification(`Erro interno: ${errorMessage}`, 'error')
      sendResponse({ success: false, error: `Erro interno: ${errorMessage}` })
    }
  })()
  return true
})
