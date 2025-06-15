import browser from 'webextension-polyfill'
import { showNotification } from './services/notification.service'

export async function initializeContentScript(): Promise<void> {
  try {
    const response = await browser.runtime.sendMessage({ action: 'getCookie' })
    if (!(response && typeof response === 'object' && 'success' in response && response.success)) {
      const errorMsg =
        response && typeof response === 'object' && 'error' in response && response.error
          ? response.error
          : 'Cookies de sessão não encontrados.'
      await showNotification(
        `Problema ao detectar sessão: ${typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg)}`,
        'warning',
      )
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    await showNotification(`Erro ao inicializar o content script: ${errorMessage}`, 'error')
  }
}
