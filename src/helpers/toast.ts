import type { NotificationType, ToastPosition } from '../types'

export function showToast(message: string, type: NotificationType, position: ToastPosition = 'top') {
  if (typeof document === 'undefined') return

  const backgroundColors: Record<NotificationType, string> = {
    error: 'rgba(220, 38, 38, 0.95)',
    success: 'rgba(22, 163, 74, 0.95)',
    warning: 'rgba(245, 158, 66, 0.95)',
    info: 'rgba(59, 130, 246, 0.95)',
  }

  const containerId = `toast-container-${position}`
  let container = document.getElementById(containerId)

  if (!container) {
    container = document.createElement('div')
    container.id = containerId
    container.style.position = 'fixed'
    container.style.zIndex = '99999'
    container.style.width = '280px'
    Object.assign(container.style, {
      ...{
        top: { top: '16px', left: '50%', transform: 'translateX(-50%)' },
        center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
        bottom: { bottom: '16px', left: '50%', transform: 'translateX(-50%)' },
      }[position],
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    })
    document.body.appendChild(container)
  }

  const backgroundColor = backgroundColors[type] ?? 'rgba(245, 158, 66, 0.95)'

  const existingToasts = Array.from(container.children)
  for (const existingToast of existingToasts) {
    if (existingToast.textContent?.includes(message)) {
      return
    }
  }

  const toast = document.createElement('div')

  Object.assign(toast.style, {
    background: backgroundColor,
    color: '#fff',
    padding: '12px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    opacity: '0',
    transition: 'all 0.3s ease',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid rgba(255,255,255,0.1)',
    transform: 'translateY(10px)',
    marginBottom: '4px',
    lineHeight: '1.4',
  })

  const messageContainer = document.createElement('div')
  messageContainer.textContent = message
  Object.assign(messageContainer.style, {
    flexGrow: '1',
    marginRight: '12px',
    paddingRight: '4px',
    wordBreak: 'break-word',
    hyphens: 'auto',
    maxWidth: 'calc(100% - 24px)',
  })

  const closeBtn = document.createElement('button')
  closeBtn.innerHTML = '&times;'
  Object.assign(closeBtn.style, {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '22px',
    cursor: 'pointer',
    padding: '0',
    lineHeight: '1',
    width: '20px',
    height: '20px',
    opacity: '0.7',
    transition: 'opacity 0.2s',
    flexShrink: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: '-2px',
  })

  closeBtn.addEventListener('mouseover', () => {
    closeBtn.style.opacity = '1'
  })

  closeBtn.addEventListener('mouseout', () => {
    closeBtn.style.opacity = '0.7'
  })

  closeBtn.onclick = () => {
    toast.style.opacity = '0'
    toast.style.transform = 'translateY(10px)'
    setTimeout(() => toast.remove(), 300)
  }

  toast.appendChild(messageContainer)
  toast.appendChild(closeBtn)
  container.appendChild(toast)

  requestAnimationFrame(() => {
    toast.style.opacity = '1'
    toast.style.transform = 'translateY(0)'
  })

  const timeoutId = setTimeout(() => {
    toast.style.opacity = '0'
    toast.style.transform = 'translateY(10px)'
    setTimeout(() => toast.remove(), 300)
  }, 4000)

  toast.addEventListener('mouseenter', () => clearTimeout(timeoutId))
  toast.addEventListener('mouseleave', () => {
    setTimeout(() => {
      toast.style.opacity = '0'
      toast.style.transform = 'translateY(10px)'
      setTimeout(() => toast.remove(), 300)
    }, 1000)
  })
}
