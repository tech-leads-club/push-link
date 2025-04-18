import { usePostHog } from 'posthog-js/react'
import { useEffect, useState } from 'react'
import { fetchAuthCookies } from '../services/auth.service'
import { GetCookieResponse } from '../types'

export function useAuthStatus() {
  const posthog = usePostHog()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response: GetCookieResponse = await fetchAuthCookies()
        if (response.success) {
          setIsLoggedIn(true)
          setAuthError(null)
        } else {
          setIsLoggedIn(false)
          setAuthError(
            response.error ??
              'Erro ao verificar autenticação. Faça login manualmente em www.techleads.club e recarregue a extensão.',
          )
        }
      } catch (error) {
        posthog.captureException(error)
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
        setIsLoggedIn(false)
        setAuthError(`Erro ao verificar autenticação: ${errorMessage}`)
      }
    }

    checkAuthStatus()
  }, [posthog])

  return { isLoggedIn, authError }
}
