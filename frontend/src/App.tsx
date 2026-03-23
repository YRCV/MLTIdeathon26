import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Browse from './pages/Browse'
import HowItWorks from './pages/HowItWorks'
import Trade from './pages/Trade'
import Messages from './pages/Messages'
import ListItem from './pages/ListItem'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/trade/:id" element={<Trade />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/list" element={<ListItem />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
