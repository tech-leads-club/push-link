import browser from 'webextension-polyfill'
import { showToast } from '../helpers/toast'
import type { NotificationType, ToastPosition } from '../types'

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
