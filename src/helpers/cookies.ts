import browser from 'webextension-polyfill'
import { BASE_URL } from '../constants'
import { showNotification } from '../services/notification.service'
import type { CookieInfo, StorageCookies } from '../types'

export function validateCookies(cookies: StorageCookies): boolean {
  const { remember_user_token, user_session_identifier, _circle_session } = cookies
  return !!(remember_user_token && user_session_identifier && _circle_session)
}

export function createCookieHeader(cookies: StorageCookies): string {
  return (
    `remember_user_token=${cookies.remember_user_token}; ` +
    `user_session_identifier=${cookies.user_session_identifier}; ` +
    `_circle_session=${cookies._circle_session}`
  )
}

export async function getCookie(cookieInfo: CookieInfo): Promise<browser.Cookies.Cookie | null> {
  try {
    const cookie = await browser.cookies.get({
      url: BASE_URL,
      name: cookieInfo.name,
    })

    if (!cookie) {
      await showNotification(`Cookie não encontrado: ${cookieInfo.name}`, 'warning')
    }

    return cookie
  } catch {
    await showNotification(`Erro ao buscar cookie: ${cookieInfo.name}`, 'error')
    return null
  }
}

export async function getStoredCookies(): Promise<StorageCookies> {
  try {
    return await browser.storage.local.get(['remember_user_token', 'user_session_identifier', '_circle_session'])
  } catch {
    await showNotification('Erro ao obter cookies do storage', 'error')
    return {}
  }
}
