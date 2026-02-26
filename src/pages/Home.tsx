import Intro from '../components/hero/Intro'

const placeholderStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#88889A',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '14px',
  borderTop: '1px solid rgba(255,255,255,0.04)',
}

export default function Home() {
  return (
    <>
      <Intro />
      <section style={placeholderStyle}>3. jelenet — Demo elozetesek</section>
      <section style={placeholderStyle}>4. jelenet — Folyamat</section>
      <section style={placeholderStyle}>5. jelenet — Epitos szekcio</section>
      <section style={placeholderStyle}>6. jelenet — CTA / Amelia</section>
      <section style={placeholderStyle}>7. jelenet — Footer</section>
    </>
  )
}
