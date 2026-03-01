import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from '../common/ScrollReveal'
import { SkeletonCard } from '../common/Loader'
import JobCard from '../common/JobCard'
import { jobsApi } from '../../services/api'

const MOCK_JOBS = [
  { id: 1,  title: 'Email Marketing',   company: 'Revolut',   location: 'Madrid, Spain',       type: 'Full-time', category: 'Marketing', description: 'Revolut is looking for Email Marketing to help team manage campaigns and grow user base effectively.', created_at: new Date().toISOString() },
  { id: 2,  title: 'Brand Designer',    company: 'Dropbox',   location: 'San Francisco, US',   type: 'Full-time', category: 'Design',    description: 'Dropbox is looking for Brand Designer to help the team craft beautiful visual identities and assets.', created_at: new Date().toISOString() },
  { id: 3,  title: 'Email Marketing',   company: 'Pitch',     location: 'Berlin, Germany',     type: 'Full-time', category: 'Marketing', description: 'Pitch is looking for Customer Manager to join marketing team and drive engagement.', created_at: new Date().toISOString() },
  { id: 4,  title: 'Visual Designer',   company: 'Blinklist', location: 'Granada, Spain',      type: 'Full-time', category: 'Design',    description: 'Blinkist is looking for Visual Designer to help team design stunning user experiences.', created_at: new Date().toISOString() },
  { id: 5,  title: 'Product Designer',  company: 'ClassPass', location: 'Manchester, UK',      type: 'Full-time', category: 'Design',    description: 'ClassPass is looking for Product Designer to help us create seamless experiences.', created_at: new Date().toISOString() },
  { id: 6,  title: 'Lead Designer',     company: 'Canva',     location: 'Ontario, Canada',     type: 'Full-time', category: 'Design',    description: 'Canva is looking for Lead Engineer to help develop new design tools and features.', created_at: new Date().toISOString() },
  { id: 7,  title: 'Brand Strategist',  company: 'GoDaddy',   location: 'Marseille, France',   type: 'Full-time', category: 'Marketing', description: 'GoDaddy is looking for Brand Strategist to join the team and shape brand direction.', created_at: new Date().toISOString() },
  { id: 8,  title: 'Data Analyst',      company: 'Twitter',   location: 'San Diego, US',       type: 'Full-time', category: 'Technology',description: 'Twitter is looking for Data Analyst to help team design and interpret key metrics.', created_at: new Date().toISOString() },
]

const FeaturedJobs = () => {
  const [jobs,    setJobs]    = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const ac = new AbortController()
    jobsApi.getAll({}, { signal: ac.signal })
      .then(res => {
        const data = res.data.data ?? []
        setJobs(data.length > 0 ? data.slice(0, 8) : MOCK_JOBS)
      })
      .catch((err) => { if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') setJobs(MOCK_JOBS) })
      .finally(() => setLoading(false))
    return () => ac.abort()
  }, [])

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal variant="fadeUp">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-dark">
              Featured <span className="text-accent">jobs</span>
            </h2>
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => navigate('/jobs')}
              className="hidden sm:flex items-center gap-2 text-sm font-semibold
                         text-primary-600 hover:text-primary-700 transition-colors"
            >
              Show all jobs <ArrowRight size={14} />
            </motion.button>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {jobs.map(job => (
              <StaggerItem key={job.id}>
                <JobCard job={job} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        <ScrollReveal variant="fadeUp" delay={0.2}>
          <div className="text-center mt-10">
            <button onClick={() => navigate('/jobs')} className="btn-outline">
              Show all jobs <ArrowRight size={14} />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default FeaturedJobs