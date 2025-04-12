import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './extension/global.css'
import { Popup } from './extension/popup/index'

const domNode = document.getElementById('root')
const root = createRoot(domNode as HTMLElement)

root.render(
  <StrictMode>
    <div className="bg-stone-900 w-[500px] h-[700px]">
      <Popup />
    </div>
  </StrictMode>,
)
