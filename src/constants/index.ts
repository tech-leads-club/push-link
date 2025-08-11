import type { CookieInfo } from '../types'

export const BASE_URL = 'https://www.techleads.club'
export const TARGET_DOMAIN = 'techleads.club'
export const SPACE_ID = 1966140
export const COMMUNITY_ID = 71710

export const REQUIRED_COOKIES: CookieInfo[] = [
  { name: 'remember_user_token' },
  { name: 'user_session_identifier' },
  { name: '_circle_session' },
]

export const EXTENSION_URLS = {
  firefox: 'https://addons.mozilla.org/en-US/firefox/addon/tech-leads-club-push-link/',
  chrome:
    'https://chromewebstore.google.com/detail/techleadsclub-push-link/opdkcagikdagcabfckgidpkmcibphjlc?authuser=1&hl=en',
}
