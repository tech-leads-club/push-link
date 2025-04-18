import { validateCookies } from '../helpers/cookies'
import type { GetCookieResponse } from '../types'
import { getAuthCookies } from './cookies.service'

export async function fetchAuthCookies(): Promise<GetCookieResponse> {
  try {
    const cookies = await getAuthCookies()
    if (!validateCookies(cookies)) throw new Error('Cookies de autenticação incompletos ou ausentes')
    return { success: true, cookies }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(errorMessage)
  }
}
