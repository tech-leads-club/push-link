const notificationCounterPattern = /^\s*[\(\[]\s*\d+\s*[\)\]]\s*/

export function sanitizeTitle(title?: string | null): string | undefined {
  if (title == null) return undefined
  if (!notificationCounterPattern.test(title)) return title
  return title.replace(notificationCounterPattern, '').trimStart()
}
