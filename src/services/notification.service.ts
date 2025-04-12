import axios from 'redaxios'
import browser from 'webextension-polyfill'
import { BASE_URL, COMMUNITY_ID } from '../constants'
import { createCookieHeader, getStoredCookies } from '../helpers/cookies'
import { showToast } from '../helpers/toast'
import type { NotificationType, ToastPosition } from '../types'
import { isRedaxiosError } from '../utils/typeguards'

export async function showNotification(
  message: string,
  type: NotificationType,
  position?: ToastPosition,
): Promise<void> {
  if (browser.notifications) {
    const titleMapping: Record<NotificationType, string> = {
      success: 'Sucesso',
      error: 'Erro',
      info: 'Informação',
      warning: 'Aviso',
    }

    await browser.notifications.create({
      type: 'basic',
      iconUrl: browser.runtime.getURL('public/logo.png'),
      title: titleMapping[type],
      message,
    })
  } else if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    showToast(message, type, position)
  }
}

export async function fetchNotifications(): Promise<void> {
  try {
    const cookies = await getStoredCookies()

    if (!cookies.remember_user_token || !cookies.user_session_identifier || !cookies._circle_session) {
      await showNotification('Cookies não encontrados. Por favor, faça login no site www.techleads.club', 'error')
      return
    }

    const cookieHeader = createCookieHeader(cookies)
    await axios.get(`${BASE_URL}/notifications/new_notifications_count`, {
      params: { community_id: COMMUNITY_ID },
      headers: { Cookie: cookieHeader, 'Content-Type': 'application/json' },
    })

    await showNotification('Notificações obtidas com sucesso!', 'success')
  } catch (error: unknown) {
    let errorMessage = 'Erro ao buscar notificações'

    if (isRedaxiosError(error)) {
      errorMessage = error.response?.data?.message ?? `Erro na requisição: ${error.response?.status}`
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    await showNotification(errorMessage, 'error')
  }
}
