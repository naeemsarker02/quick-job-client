import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'

const Navbar = () => {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const links = [
    { label: 'Find Jobs',        to: '/jobs'  },
    { label: 'Browse Companies', to: '/jobs'  },
    { label: 'Admin',            to: '/admin' },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center 
                            justify-center group-hover:bg-primary-700 transition-colors">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <span className="font-bold text-lg text-dark">
              Quick<span className="text-primary-600">Hire</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to + l.label}
                to={l.to}
                className={`text-sm font-medium transition-colors
                  ${pathname === l.to
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                  }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/jobs"
              className="text-sm font-semibold text-gray-600 hover:text-primary-600 
                         transition-colors px-3 py-2">
              Login
            </Link>
            <Link to="/admin" className="btn-primary text-sm py-2.5 px-5">
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-xl border border-gray-200 
                       flex items-center justify-center text-gray-600 
                       hover:border-primary-300 transition-colors"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="text-sm font-medium text-gray-700 hover:text-primary-600 
                             py-2 border-b border-gray-50 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex gap-3 pt-2">
                <Link to="/jobs"  className="btn-outline flex-1 justify-center text-sm py-2.5">Login</Link>
                <Link to="/admin" className="btn-primary flex-1 justify-center text-sm py-2.5">Sign Up</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar