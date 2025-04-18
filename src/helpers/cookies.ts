import type { StorageCookies } from '../types'

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
