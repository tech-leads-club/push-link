import browser from 'webextension-polyfill'
import { BASE_URL, REQUIRED_COOKIES } from '../constants'
import { StorageCookies } from '../types'

export async function getAuthCookies(): Promise<StorageCookies> {
  const cookies: Partial<StorageCookies> = {}

  for (const { name } of REQUIRED_COOKIES) {
    try {
      const cookie = await browser.cookies.get({ url: BASE_URL, name })
      if (!cookie) throw new Error(`Cookie não encontrado: ${name}`)
      cookies[name as keyof StorageCookies] = cookie.value
    } catch (error) {
      throw new Error(`Erro ao buscar cookie: ${name} - ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return cookies as StorageCookies
}
