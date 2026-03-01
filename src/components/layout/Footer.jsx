import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Twitter, Linkedin, Github, Instagram } from 'lucide-react'
import { ScrollReveal } from '../common/ScrollReveal'

const Footer = () => {
  const cols = [
    {
      title: 'About',
      links: ['Companies','Pricing','Terms','Advice','Privacy Policy'],
    },
    {
      title: 'Resources',
      links: ['Help Docs','Guide','Updates','Contact Us'],
    },
  ]

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <ScrollReveal variant="fadeUp" delay={0}>
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Zap size={16} className="text-white" fill="white" />
                </div>
                <span className="font-bold text-lg">Quick<span className="text-accent">Hire</span></span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">
                Great platform for the job seeker that passionate about startups.
                Find your dream job easier.
              </p>
              <div className="flex gap-3 mt-6">
                {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ y: -2, scale: 1.1 }}
                    className="w-9 h-9 rounded-lg bg-white/10 flex items-center 
                               justify-center hover:bg-primary-600 transition-colors"
                  >
                    <Icon size={15} />
                  </motion.button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Link columns */}
          {cols.map((col, i) => (
            <ScrollReveal key={col.title} variant="fadeUp" delay={(i + 1) * 0.1}>
              <div>
                <h4 className="font-semibold text-sm mb-5 text-white">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        to="/"
                        className="text-gray-400 text-sm hover:text-accent transition-colors"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}

          {/* Newsletter */}
          <ScrollReveal variant="fadeUp" delay={0.3}>
            <div>
              <h4 className="font-semibold text-sm mb-2">Get job notifications</h4>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                The latest job news, articles, sent to your inbox weekly.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 
                             text-white placeholder:text-gray-500 text-sm focus:outline-none 
                             focus:border-primary-500 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2.5 bg-primary-600 rounded-xl text-sm font-semibold 
                             hover:bg-primary-700 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row 
                        items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">2021 @ QuickHire. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy','Terms','Cookies'].map((item) => (
              <Link key={item} to="/"
                className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer