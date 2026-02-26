import { Routes, Route } from 'react-router-dom'
import Nav from './components/nav/Nav'
import Home from './pages/Home.tsx'
import Dashboards from './pages/Dashboards.tsx'
import AI from './pages/AI.tsx'
import Automation from './pages/Automation.tsx'
import Websites from './pages/Websites.tsx'
import Process from './pages/Process.tsx'
import Contact from './pages/Contact.tsx'
import Impressum from './pages/Impressum.tsx'
import Privacy from './pages/Privacy.tsx'

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboardok" element={<Dashboards />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/automatizacio" element={<Automation />} />
        <Route path="/weboldalak" element={<Websites />} />
        <Route path="/folyamat" element={<Process />} />
        <Route path="/kapcsolat" element={<Contact />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/adatvedelem" element={<Privacy />} />
      </Routes>
    </>
  )
}
