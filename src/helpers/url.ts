import { TARGET_DOMAIN } from '../constants'

export function isTargetWebsite(url: string | undefined): boolean {
  return !!url && url.includes(TARGET_DOMAIN)
}
