import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CustomCursor from './components/ui/CustomCursor'

const Home = lazy(() => import('./pages/Home'))
const Dashboards = lazy(() => import('./pages/Dashboards'))
const AI = lazy(() => import('./pages/AI'))
const Automation = lazy(() => import('./pages/Automation'))
const Websites = lazy(() => import('./pages/Websites'))
const Process = lazy(() => import('./pages/Process'))
const Contact = lazy(() => import('./pages/Contact'))
const Impressum = lazy(() => import('./pages/Impressum'))
const Privacy = lazy(() => import('./pages/Privacy'))

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboardok" element={<Dashboards />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/automatizacio" element={<Automation />} />
          <Route path="/weboldalak" element={<Websites />} />
          <Route path="/tudnivalok" element={<Process />} />
          <Route path="/kapcsolat" element={<Contact />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/adatvedelem" element={<Privacy />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
