import '../global.css'

import { useAuthStatus } from '../../hooks/useAuthStatus'
import { Login } from './components/Login'
import { ShareForm } from './components/ShareForm'

export const Popup = () => {
  const { isLoggedIn, authError } = useAuthStatus()

  return (
    <div className="flex flex-col justify-center items-center p-5 gap-5 text-center bg-gray-900">
      {isLoggedIn ? (
        <ShareForm />
      ) : (
        <>
          <Login />
          {authError && <div className="text-red-600 text-sm mt-2">{authError}</div>}
        </>
      )}
    </div>
  )
}
