import type { InfoRequest } from '../types'

export function isValidRequest(request: unknown, action: string): request is InfoRequest {
  return (
    typeof request === 'object' &&
    request !== null &&
    'action' in request &&
    typeof (request as InfoRequest).action === 'string' &&
    (request as InfoRequest).action === action
  )
}
