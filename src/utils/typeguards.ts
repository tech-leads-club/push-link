import type { RedaxiosError } from '../types'

export function isRedaxiosError(error: unknown): error is RedaxiosError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as { response: unknown }).response === 'object' &&
    (error as { response: { status?: unknown } }).response?.status !== undefined
  )
}
