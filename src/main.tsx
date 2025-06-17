import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './extension/global.css'
import { Popup } from './extension/popup/index'

const domNode = document.getElementById('root')
const root = createRoot(domNode as HTMLElement)

root.render(
  <StrictMode>
    <div className="bg-gray-900 w-[320px] h-full">
      <Popup />
    </div>
  </StrictMode>,
)
