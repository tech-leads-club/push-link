import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './extension/global.css'
import Options from './extension/options/index'

const domNode = document.getElementById('root')
const root = createRoot(domNode as HTMLElement)

root.render(
  <StrictMode>
    <div className="bg-stone-900 w-full h-[1000px]">
      <Options />
    </div>
  </StrictMode>,
)
