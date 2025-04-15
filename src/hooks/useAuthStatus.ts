import { useEffect, useState } from 'react'
import { requestAuthToken } from '../services/auth.service'

export function useAuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await requestAuthToken()
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
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
        setIsLoggedIn(false)
        setAuthError(`Erro ao verificar autenticação: ${errorMessage}`)
      }
    }

    checkAuthStatus()
  }, [])

  return { isLoggedIn, authError }
}
