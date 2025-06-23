import '../global.css'

import { useEffect } from 'react'
import { initializeContentScript } from '../../content'
import { useAuthStatus } from '../../hooks/useAuthStatus'
import { showNotification } from '../../services/notification.service'
import { Login } from './components/Login'
import { ShareForm } from './components/ShareForm'

export const Popup = () => {
  const { isLoggedIn, authError } = useAuthStatus()

  useEffect(() => {
    if (authError) {
      initializeContentScript()
      showNotification(authError, 'error')
    }
  }, [authError])

  return (
    <div className="flex flex-col justify-center items-center p-5 gap-5 text-center bg-gray-900">
      {isLoggedIn ? <ShareForm /> : <Login />}
    </div>
  )
}
