import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="text-8xl mb-6"
      >
        🔍
      </motion.div>
      <h1 className="text-4xl font-extrabold text-dark mb-2">404</h1>
      <p className="text-gray-500 mb-8">Oops! This page doesn't exist.</p>
      <button onClick={() => navigate('/')} className="btn-primary">
        Back to Home
      </button>
    </div>
  )
}

export default NotFound