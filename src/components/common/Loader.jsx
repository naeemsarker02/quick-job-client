import { motion } from 'framer-motion'

// Full-page loader
export const PageLoader = () => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative w-16 h-16">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary-100"
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <motion.p
        className="text-sm font-semibold text-gray-500 tracking-widest uppercase"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading…
      </motion.p>
    </motion.div>
  </div>
)

// Inline spinner
export const Spinner = ({ size = 'md' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' }
  return (
    <motion.div
      className={`${sizes[size]} rounded-full border-2 border-primary-100 border-t-primary-600`}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  )
}

// Skeleton card
export const SkeletonCard = () => (
  <div className="card animate-pulse">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-gray-200" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
    </div>
    <div className="mt-4 flex gap-2">
      <div className="h-6 w-20 bg-gray-200 rounded-full" />
      <div className="h-6 w-16 bg-gray-200 rounded-full" />
    </div>
  </div>
)