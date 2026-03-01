import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '../common/ScrollReveal'

const CTABanner = () => {
  const navigate = useNavigate()

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal variant="scale">
          <div className="relative bg-primary-600 rounded-3xl overflow-hidden">

            {/* Background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 30, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -bottom-16 left-1/3 w-60 h-60 rounded-full bg-white/5"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-8 p-10 md:p-14 items-center">
              {/* Left */}
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl md:text-4xl font-extrabold text-white leading-tight"
                >
                  Start posting jobs today
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-white/70 mt-3 text-base"
                >
                  Start posting jobs for only <strong className="text-white">$10</strong>.
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ scale: 1.04, x: 2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/admin')}
                  className="mt-7 inline-flex items-center gap-2 bg-white text-primary-600 
                             font-semibold px-7 py-3.5 rounded-xl hover:bg-gray-50 
                             transition-colors shadow-lg text-sm"
                >
                  Sign Up For Free <ArrowRight size={14} />
                </motion.button>
              </div>

              {/* Right — mini dashboard preview */}
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="hidden md:block"
              >
                <div className="bg-white/15 backdrop-blur rounded-2xl p-5 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-semibold text-sm">Job Statistics</span>
                    <span className="text-white/50 text-xs">This week</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: 'Views', value: '2,342', up: true },
                      { label: 'Applied', value: '654',   up: false },
                      { label: 'Open',    value: '12',    up: true  },
                    ].map(s => (
                      <div key={s.label} className="bg-white/10 rounded-xl p-3">
                        <p className="text-white font-bold text-lg">{s.value}</p>
                        <p className="text-white/60 text-xs">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  {/* Mini bar chart */}
                  <div className="flex items-end gap-1 h-16">
                    {[60,40,80,55,90,45,70].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
                        className="flex-1 bg-white/30 rounded-t-sm"
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1">
                    {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d, i) => (
                      <span key={i} className="text-white/40 text-xs flex-1 text-center">{d.charAt(0)}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default CTABanner