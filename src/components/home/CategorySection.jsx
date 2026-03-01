import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Palette, TrendingUp, Megaphone, DollarSign, Monitor, Code2, Briefcase, Users } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from '../common/ScrollReveal'

const categories = [
  { name: 'Design',         count: 235, Icon: Palette    },
  { name: 'Sales',          count: 756, Icon: TrendingUp  },
  { name: 'Marketing',      count: 140, Icon: Megaphone,  },
  { name: 'Finance',        count: 325, Icon: DollarSign  },
  { name: 'Technology',     count: 436, Icon: Monitor     },
  { name: 'Engineering',    count: 542, Icon: Code2       },
  { name: 'Business',       count: 211, Icon: Briefcase   },
  { name: 'Human Resource', count: 346, Icon: Users       },
]

const CategorySection = () => {
  const navigate = useNavigate()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal variant="fadeUp">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-dark">
              Explore by <span className="text-accent">category</span>
            </h2>
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => navigate('/jobs')}
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              Show all jobs <ArrowRight size={14} />
            </motion.button>
          </div>
        </ScrollReveal>

        {/* grid-cols-2 on mobile, 4 on desktop */}
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <StaggerItem key={cat.name}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/jobs?category=${cat.name}`)}
              className={`w-full text-left p-6 rounded-xl border-2 transition-colors duration-300 ease-out cursor-pointer group
                  ${cat.highlight
                    ? 'bg-primary-600 border-primary-600'
                    : 'bg-white border-gray-200'
                  }
                  hover:bg-primary-600 hover:border-primary-600`}
              >
                <div className="mb-4">
                  <cat.Icon
                    size={28}
                    strokeWidth={1.5}
                  className={`${cat.highlight ? 'text-white' : 'text-primary-600'} group-hover:text-white transition-colors duration-300`}
                  />
                </div>
              <p className={`font-bold text-sm sm:text-base mb-1 ${cat.highlight ? 'text-white' : 'text-dark'} group-hover:text-white transition-colors duration-300`}>
                  {cat.name}
                </p>
              <p className={`text-xs sm:text-sm flex items-center gap-1 ${cat.highlight ? 'text-white/80' : 'text-gray-400'} group-hover:text-white/80 transition-colors duration-300`}>
                  {cat.count} jobs available
                  <ArrowRight size={12} />
                </p>
              </motion.button>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal variant="fadeUp" delay={0.3}>
          <div className="sm:hidden mt-8 text-center">
            <button onClick={() => navigate('/jobs')} className="btn-outline text-sm">
              Show all jobs <ArrowRight size={14} />
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}

export default CategorySection