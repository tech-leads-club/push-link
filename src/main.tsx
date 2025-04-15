import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './extension/global.css'
import { Popup } from './extension/popup/index'

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
})

const domNode = document.getElementById('root')
const root = createRoot(domNode as HTMLElement)

root.render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <div className="bg-gray-900 w-[320px] h-[480px]">
        <Popup />
      </div>
    </PostHogProvider>
  </StrictMode>,
)
