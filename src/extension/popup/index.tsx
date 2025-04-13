import { useEffect, useState } from 'react'
import { requestAuthToken } from '../../services/auth.service'
import '../global.css'

import { Login } from './login'
import { ShareForm } from './share-form'

export const Popup = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

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

  useEffect(() => {
    checkAuthStatus()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center p-5 gap-5 text-center">
      {!isLoggedIn ? (
        <>
          <Login />
          {authError && <div className="text-red-600 text-sm mt-2">{authError}</div>}
        </>
      ) : (
        <ShareForm />
      )}
    </div>
  )
}
