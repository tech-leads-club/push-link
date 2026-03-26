import type { StorageCookies } from '../types'

export function validateCookies(cookies: StorageCookies): boolean {
  const { user_session_identifier, _circle_session } = cookies
  return !!(user_session_identifier && _circle_session)
}

export function createCookieHeader(cookies: StorageCookies): string {
  return (
    `user_session_identifier=${cookies.user_session_identifier}; ` +
    `_circle_session=${cookies._circle_session}`
  )
}
