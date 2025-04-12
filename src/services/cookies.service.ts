import browser from 'webextension-polyfill'
import { REQUIRED_COOKIES } from '../constants'
import { getCookie } from '../helpers/cookies'
import type { GetCookieResponse } from '../types'
import { showNotification } from './notification.service'

export async function handleGetCookieRequest(sendResponse: (response: GetCookieResponse) => void): Promise<void> {
  try {
    const cookiePromises = REQUIRED_COOKIES.map((cookie) => getCookie(cookie))
    const cookieResults = await Promise.all(cookiePromises)
    const cookieData: Record<string, string> = {}
    let validCookiesCount = 0

    cookieResults.forEach((cookie) => {
      if (cookie) {
        cookieData[cookie.name] = cookie.value
        validCookiesCount++
      }
    })

    if (validCookiesCount === REQUIRED_COOKIES.length) {
      await browser.storage.local.set(cookieData)
      sendResponse({ success: true, cookies: cookieData })
    } else {
      sendResponse({
        success: false,
        error: `Cookies not found completely (${validCookiesCount}/${REQUIRED_COOKIES.length})`,
      })
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    await showNotification(`Erro ao processar cookies: ${errorMessage}`, 'error')
    sendResponse({ success: false, error: `Error processing cookies: ${errorMessage}` })
  }
}
