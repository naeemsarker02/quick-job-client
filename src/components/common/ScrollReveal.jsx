import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const variants = {
  fadeUp:   { hidden: { opacity: 0, y: 40 },         visible: { opacity: 1, y: 0 } },
  fadeIn:   { hidden: { opacity: 0 },                 visible: { opacity: 1 } },
  fadeLeft: { hidden: { opacity: 0, x: -40 },         visible: { opacity: 1, x: 0 } },
  fadeRight:{ hidden: { opacity: 0, x: 40 },          visible: { opacity: 1, x: 0 } },
  scale:    { hidden: { opacity: 0, scale: 0.85 },     visible: { opacity: 1, scale: 1 } },
  slideUp:  { hidden: { opacity: 0, y: 60 },           visible: { opacity: 1, y: 0 } },
}

export const ScrollReveal = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.5,
  className = '',
  once = true,
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      variants={variants[variant]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger container for list animations
export const StaggerContainer = ({ children, className = '', staggerDelay = 0.08 }) => {
  const ref = useRef(null)
  // Use generous margin so content triggers in view earlier (fixes mobile where section is below fold)
  const isInView = useInView(ref, { once: true, margin: '80px', amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = ({ children, className = '' }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    }}
    className={className}
  >
    {children}
  </motion.div>
)