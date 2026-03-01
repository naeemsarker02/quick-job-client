import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MapPin, ArrowRight } from 'lucide-react'

const Hero = () => {
  const [keyword,  setKeyword]  = useState('')
  const [location, setLocation] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (keyword)  params.set('search',   keyword)
    if (location) params.set('location', location)
    navigate(`/jobs?${params.toString()}`)
  }

  const popular = ['UI Designer','UX Researcher','Android','Admin']

  const brands = ['vodafone','intel','TESLA','AMD','Talkit']

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">

      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full 
                     bg-primary-50 opacity-60"
          animate={{ scale: [1, 1.04, 1], x: [0, 12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full 
                        bg-accent/5 -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — Text */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark leading-tight">
                Discover more than{' '}
                <span className="relative">
                  <span className="text-primary-600">5000+ Jobs</span>
                  <motion.div
                    className="absolute -bottom-1 left-0 h-1 bg-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-5 text-gray-500 text-lg leading-relaxed max-w-lg"
            >
              Great platform for the job seeker that searching for new career heights
              and passionate about startups.
            </motion.p>

            {/* Search form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              onSubmit={handleSearch}
              className="mt-8 bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.10)] 
                         border border-gray-100 p-2 flex flex-col sm:flex-row gap-2"
            >
              <div className="flex items-center gap-3 flex-1 px-4 py-2">
                <Search size={18} className="text-gray-400 flex-shrink-0" />
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Job title or keyword"
                  className="w-full text-sm text-dark placeholder:text-gray-400 
                             focus:outline-none bg-transparent"
                />
              </div>
              <div className="hidden sm:block w-px bg-gray-200 my-2" />
              <div className="flex items-center gap-3 flex-1 px-4 py-2">
                <MapPin size={18} className="text-gray-400 flex-shrink-0" />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Florence, Italy"
                  className="w-full text-sm text-dark placeholder:text-gray-400 
                             focus:outline-none bg-transparent"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary rounded-xl py-3 px-6 text-sm whitespace-nowrap"
              >
                Search my job
              </motion.button>
            </motion.form>

            {/* Popular searches */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-5 flex flex-wrap items-center gap-2"
            >
              <span className="text-sm text-gray-500">Popular:</span>
              {popular.map((p, i) => (
                <motion.button
                  key={p}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  onClick={() => navigate(`/jobs?search=${p}`)}
                  className="text-xs font-medium text-gray-600 hover:text-primary-600 
                             hover:bg-primary-50 px-3 py-1.5 rounded-full border 
                             border-gray-200 hover:border-primary-200 transition-all"
                >
                  {p}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Right — Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Hero decorative card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-md"
            >
              <div className="bg-primary-600 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 
                                -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 
                                translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center 
                                    justify-center text-white font-bold">Q</div>
                    <span className="font-bold text-lg">QuickHire</span>
                  </div>
                  <p className="text-white/80 text-sm mb-4">Your dream job is waiting</p>
                  <div className="space-y-3">
                    {[
                      { role: 'Product Designer', co: 'Figma', loc: 'Remote' },
                      { role: 'Frontend Dev',      co: 'Vercel', loc: 'Berlin' },
                      { role: 'UI/UX Lead',        co: 'Framer', loc: 'London' },
                    ].map((job, i) => (
                      <motion.div
                        key={job.role}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.15 }}
                        className="flex items-center justify-between bg-white/10 
                                   rounded-xl px-4 py-3"
                      >
                        <div>
                          <p className="font-semibold text-sm">{job.role}</p>
                          <p className="text-white/60 text-xs">{job.co}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-white/70">{job.loc}</p>
                          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                            Full-time
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="mt-5 flex items-center gap-2 text-sm font-semibold 
                               text-white/80 hover:text-white transition-colors"
                  >
                    Browse all jobs <ArrowRight size={14} />
                  </motion.button>
                </div>
              </div>

              {/* Floating stat badges */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -left-8 top-1/3 bg-white rounded-2xl shadow-xl 
                           px-4 py-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center 
                                justify-center text-emerald-600 text-lg">✓</div>
                <div>
                  <p className="font-bold text-dark text-sm">2,000+</p>
                  <p className="text-gray-400 text-xs">Companies hiring</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -right-8 bottom-1/4 bg-white rounded-2xl shadow-xl 
                           px-4 py-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center 
                                justify-center text-primary-600 text-lg">🚀</div>
                <div>
                  <p className="font-bold text-dark text-sm">5,000+</p>
                  <p className="text-gray-400 text-xs">Jobs available</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Brand logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16 lg:mt-20 border-t border-gray-100 pt-10"
        >
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-6 font-medium">
            Companies we helped grow
          </p>
          <div className="flex flex-wrap items-center gap-8 lg:gap-16">
            {brands.map((b, i) => (
              <motion.span
                key={b}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="text-lg font-bold text-gray-300 hover:text-gray-500 
                           transition-colors cursor-default tracking-wide"
              >
                {b}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero