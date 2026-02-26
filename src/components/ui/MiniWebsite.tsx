import { type ReactNode } from 'react'
import './MiniWebsite.css'

interface MiniWebsiteProps {
  url: string
  children: ReactNode
}

export default function MiniWebsite({ url, children }: MiniWebsiteProps) {
  return (
    <div className="mini-website">
      {/* Browser chrome */}
      <div className="mini-website__toolbar">
        <div className="mini-website__dots">
          <span className="mini-website__dot mini-website__dot--red" />
          <span className="mini-website__dot mini-website__dot--yellow" />
          <span className="mini-website__dot mini-website__dot--green" />
        </div>
        <div className="mini-website__url-bar">
          {url}
        </div>
      </div>

      {/* Content area */}
      <div className="mini-website__content">
        {children}
      </div>
    </div>
  )
}
