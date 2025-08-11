import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './extension/global.css'
import { Popup } from './extension/popup/index'

const domNode = document.getElementById('root')
const root = createRoot(domNode as HTMLElement)

root.render(
  <StrictMode>
    <div className="w-[320px] h-full">
      <Popup />
    </div>
  </StrictMode>,
)
