import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/common/ScrollReveal'
import { SkeletonCard } from '../components/common/Loader'
import JobCard from '../components/common/JobCard'
import { jobsApi } from '../services/api'
import { CATEGORIES, JOB_TYPES } from '../utils/helpers'

const JobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [jobs,        setJobs]        = useState([])
  const [loading,     setLoading]     = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // Filter state — initialized from URL params
  const [search,   setSearch]   = useState(searchParams.get('search')   || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [type,     setType]     = useState(searchParams.get('type')     || '')

  const fetchJobs = useCallback(async (signal) => {
    setLoading(true)
    try {
      const params = {}
      if (search)   params.search   = search
      if (location) params.location = location
      if (category) params.category = category
      if (type)     params.type     = type
      const res = await jobsApi.getAll(params, { signal })
      setJobs(res.data.data ?? [])
    } catch (err) {
      if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') setJobs([])
    } finally {
      setLoading(false)
    }
  }, [search, location, category, type])

  useEffect(() => {
    const ac = new AbortController()
    fetchJobs(ac.signal)
    return () => ac.abort()
  }, [fetchJobs])

  const handleSearch = (e) => {
    e.preventDefault()
    const p = {}
    if (search)   p.search   = search
    if (location) p.location = location
    if (category) p.category = category
    if (type)     p.type     = type
    setSearchParams(p)
  }

  const clearFilters = () => {
    setSearch(''); setLocation(''); setCategory(''); setType('')
    setSearchParams({})
  }

  const activeFilters = [category, type, location].filter(Boolean)

  return (
    <div className="min-h-screen bg-gray-50 pt-20">

      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <ScrollReveal variant="fadeUp">
            <h1 className="text-3xl font-extrabold text-dark">
              Find your <span className="text-primary-600">dream job</span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              {loading ? '...' : `${jobs.length} jobs available`}
            </p>
          </ScrollReveal>

          {/* Search bar */}
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <form
              onSubmit={handleSearch}
              className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-card 
                         flex flex-col sm:flex-row gap-2 p-2"
            >
              <div className="flex items-center gap-3 flex-1 px-4 py-2">
                <Search size={16} className="text-gray-400 flex-shrink-0" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Job title or keyword..."
                  className="w-full text-sm text-dark placeholder:text-gray-400 
                             focus:outline-none bg-transparent"
                />
                {search && (
                  <button type="button" onClick={() => setSearch('')}>
                    <X size={14} className="text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              <div className="hidden sm:block w-px bg-gray-200 my-2" />
              <div className="flex items-center gap-3 flex-1 px-4 py-2">
                <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                <input
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Location..."
                  className="w-full text-sm text-dark placeholder:text-gray-400 
                             focus:outline-none bg-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border 
                             border-gray-200 text-sm font-medium text-gray-600 
                             hover:border-primary-300 hover:text-primary-600 
                             transition-colors"
                >
                  <SlidersHorizontal size={15} />
                  Filters
                  {activeFilters.length > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary-600 text-white 
                                     text-xs flex items-center justify-center">
                      {activeFilters.length}
                    </span>
                  )}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${showFilters ? 'rotate-180' : ''}`}
                  />
                </button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary rounded-xl py-3 px-6 text-sm"
                >
                  Search
                </motion.button>
              </div>
            </form>
          </ScrollReveal>

          {/* Expandable filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Category */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase 
                                      tracking-wide mb-2 block">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="input-field text-sm"
                    >
                      <option value="">All Categories</option>
                      {CATEGORIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Job Type */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase 
                                      tracking-wide mb-2 block">
                      Job Type
                    </label>
                    <select
                      value={type}
                      onChange={e => setType(e.target.value)}
                      className="input-field text-sm"
                    >
                      <option value="">All Types</option>
                      {JOB_TYPES.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Clear button */}
                  <div className="flex items-end">
                    {activeFilters.length > 0 && (
                      <button
                        onClick={clearFilters}
                        className="flex items-center gap-2 text-sm text-red-500 
                                   hover:text-red-600 font-medium transition-colors py-3"
                      >
                        <X size={14} /> Clear all
                      </button>
                    )}
                  </div>
                </div>

                {/* Active filter pills */}
                {activeFilters.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[category, type, location].filter(Boolean).map(f => (
                      <span key={f}
                        className="flex items-center gap-1 text-xs font-medium 
                                   bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full">
                        {f}
                        <button onClick={() => {
                          if (f === category) setCategory('')
                          if (f === type)     setType('')
                          if (f === location) setLocation('')
                        }}>
                          <X size={11} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Job Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : jobs.length === 0 ? (
          <ScrollReveal variant="fadeUp">
            <div className="text-center py-24">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl mb-5"
              >
                🔍
              </motion.div>
              <h3 className="text-xl font-bold text-dark mb-2">No jobs found</h3>
              <p className="text-gray-500 text-sm mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button onClick={clearFilters} className="btn-primary text-sm">
                Clear filters
              </button>
            </div>
          </ScrollReveal>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {jobs.map(job => (
              <StaggerItem key={job.id}>
                <JobCard job={job} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </div>
  )
}

export default JobsPage