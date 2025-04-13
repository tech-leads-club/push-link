import browser from 'webextension-polyfill'
import type { GetTokenResponse, InfoRequest, UserLoggedInResponse } from '../types'
import { showNotification } from './notification.service'

export async function requestAuthToken(): Promise<GetTokenResponse> {
  try {
    const message: InfoRequest = { action: 'getCookie' }
    const response = await browser.runtime.sendMessage(message)

    if (!response) {
      await showNotification('Resposta vazia ao verificar o token', 'error')
      return { success: false, error: 'Empty response when verifying token' }
    }

    return response as GetTokenResponse
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    await showNotification(`Erro ao verificar token: ${errorMessage}`, 'error')
    return { success: false, error: errorMessage }
  }
}

export async function notifyUserLoggedIn(): Promise<UserLoggedInResponse> {
  try {
    const message: InfoRequest = { action: 'userLoggedIn' }
    return await browser.runtime.sendMessage(message)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    await showNotification(`Erro ao enviar mensagem de login: ${errorMessage}`, 'error')
    return { success: false, error: errorMessage }
  }
}
