import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from '../common/ScrollReveal'
import JobCard from '../common/JobCard'
import { jobsApi } from '../../services/api'

const LatestJobs = () => {
  const [jobs,    setJobs]    = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const ac = new AbortController()
    jobsApi.getAll({}, { signal: ac.signal })
      .then(res => setJobs(res.data.data?.slice(0, 8) ?? []))
      .catch((err) => { if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') setJobs([]) })
      .finally(() => setLoading(false))
    return () => ac.abort()
  }, [])

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal variant="fadeUp">
          <div className="flex items-center justify-between mb-12">
            <h2 className="section-title">
              Latest <span>jobs open</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>No jobs found.</p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {jobs.map(job => (
              <StaggerItem key={job.id}>
                <JobCard job={job} variant="list" />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        <ScrollReveal variant="fadeUp" delay={0.3}>
          <div className="text-center mt-10">
            <button onClick={() => navigate('/jobs')} className="btn-primary">
              Show all jobs <ArrowRight size={14} />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default LatestJobs