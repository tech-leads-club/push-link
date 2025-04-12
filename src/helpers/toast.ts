import type { NotificationType, ToastPosition } from '../types'

export function showToast(message: string, type: NotificationType, position: ToastPosition = 'bottom-right') {
  if (typeof document === 'undefined') return

  const backgroundColors: Record<NotificationType, string> = {
    error: '#dc2626',
    success: '#16a34a',
    warning: '#f59e42',
    info: '#3b82f6',
  }

  const positionStyles: Record<ToastPosition, Partial<CSSStyleDeclaration>> = {
    'top-left': { top: '32px', left: '32px' },
    'top-center': { top: '32px', left: '50%', transform: 'translateX(-50%)' },
    'top-right': { top: '32px', right: '32px' },
    'bottom-left': { bottom: '32px', left: '32px' },
    'bottom-center': { bottom: '32px', left: '50%', transform: 'translateX(-50%)' },
    'bottom-right': { bottom: '32px', right: '32px' },
    center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  }

  const backgroundColor = backgroundColors[type] ?? '#f59e42'

  const toast = document.createElement('div')
  toast.textContent = message
  toast.style.position = 'fixed'
  toast.style.background = backgroundColor
  toast.style.color = '#fff'
  toast.style.padding = '12px 24px'
  toast.style.borderRadius = '8px'
  toast.style.fontSize = '16px'
  toast.style.zIndex = '99999'
  toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'
  toast.style.fontFamily = 'sans-serif'

  const styles = positionStyles[position]
  Object.assign(toast.style, styles)
  document.body.appendChild(toast)
  setTimeout(() => {
    toast.remove()
  }, 3000)
}
