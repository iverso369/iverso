import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type AccentColor = '--web' | '--dash' | '--ai' | '--auto'

interface SubpageLayoutProps {
  accentColor: AccentColor
  children: ReactNode
}

export default function SubpageLayout({ accentColor, children }: SubpageLayoutProps) {
  const navigate = useNavigate()

  return (
    <div style={wrapperStyle}>
      {/* Radial gradient overlay in service color */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          background: `radial-gradient(ellipse 80% 45% at 50% 0%, color-mix(in srgb, var(${accentColor}) 6%, transparent) 0%, transparent 60%)`,
          /* DESKTOP TWEAK — ellipse size can be wider on desktop */
        }}
      />

      {/* Back button */}
      <nav style={navStyle}>
        <button
          onClick={() => navigate('/')}
          style={backButtonStyle}
        >
          &#8592; Vissza
        </button>
      </nav>

      {/* Page content */}
      <main style={mainStyle}>
        {children}
      </main>
    </div>
  )
}

/* --- Inline styles (mobile-first) --- */

const wrapperStyle: React.CSSProperties = {
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
}

const navStyle: React.CSSProperties = {
  padding: '16px 20px', /* DESKTOP TWEAK — padding */
}

const backButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--gray)',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '14px',
  cursor: 'pointer',
  padding: '8px 0',
  transition: 'color 0.2s',
}

const mainStyle: React.CSSProperties = {
  padding: '0 20px 60px', /* DESKTOP TWEAK — padding, max-width */
  maxWidth: '960px', /* DESKTOP TWEAK */
  margin: '0 auto',
}
