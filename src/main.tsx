import posthog from 'posthog-js/dist/module.full.no-external'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './extension/global.css'
import { Popup } from './extension/popup/index'

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  autocapture: true,
  disable_session_recording: false,
  loaded: (posthog) => {
    posthog.register({
      full_url: window.location.href,
      domain: window.location.hostname,
    })
  },
})

const domNode = document.getElementById('root')
const root = createRoot(domNode as HTMLElement)

root.render(
  <StrictMode>
    <div className="bg-gray-900 w-[320px] h-[480px]">
      <Popup />
    </div>
  </StrictMode>,
)
