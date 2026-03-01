import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Clock, Briefcase, ArrowLeft,
  CheckCircle2, AlertCircle, Loader2, Tag,
} from 'lucide-react'
import { ScrollReveal } from '../components/common/ScrollReveal'
import { PageLoader } from '../components/common/Loader'
import { jobsApi, applicationsApi } from '../services/api'
import { getTagClass, getCompanyColor, timeAgo } from '../utils/helpers'

const INIT_FORM = { name: '', email: '', resume_link: '', cover_note: '' }

const JobDetailPage = () => {
  const { id }   = useParams()
  const navigate = useNavigate()

  const [job,        setJob]        = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [form,       setForm]       = useState(INIT_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [success,    setSuccess]    = useState(false)
  const [error,      setError]      = useState('')
  const [fieldErrs,  setFieldErrs]  = useState({})

  useEffect(() => {
    const ac = new AbortController()
    jobsApi.getById(id, { signal: ac.signal })
      .then(res => setJob(res.data.data))
      .catch((err) => { if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') setJob(null) })
      .finally(() => setLoading(false))
    return () => ac.abort()
  }, [id])

  const validate = () => {
    const errs = {}
    if (!form.name.trim())                                    errs.name        = 'Name is required'
    if (!form.email.trim())                                   errs.email       = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email       = 'Invalid email address'
    if (!form.resume_link.trim())                             errs.resume_link = 'Resume link is required'
    else {
      try { new URL(form.resume_link) }
      catch { errs.resume_link = 'Must be a valid URL (https://...)' }
    }
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setFieldErrs(errs); return }
    setFieldErrs({})
    setSubmitting(true)
    setError('')
    try {
      await applicationsApi.submit({ ...form, job_id: Number(id) })
      setSuccess(true)
      setForm(INIT_FORM)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <PageLoader />

  if (!job) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-20">
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
        className="text-6xl mb-4">😕</motion.div>
      <h2 className="text-xl font-bold text-dark mb-2">Job not found</h2>
      <p className="text-gray-500 text-sm mb-6">This job may have been removed</p>
      <button onClick={() => navigate('/jobs')} className="btn-primary text-sm">
        Browse all jobs
      </button>
    </div>
  )

  const bgColor  = getCompanyColor(job.company)
  const initials = job.company?.slice(0, 2).toUpperCase()

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Back */}
        <ScrollReveal variant="fadeLeft">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 
                       hover:text-primary-600 transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to jobs
          </button>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Left: Job Details ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Header card */}
            <ScrollReveal variant="fadeUp">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8">
                <div className="flex items-start gap-5">
                  <div className={`w-16 h-16 rounded-2xl ${bgColor} flex items-center 
                                  justify-center text-white font-bold text-lg flex-shrink-0`}>
                    {initials}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-extrabold text-dark leading-tight">
                      {job.title}
                    </h1>
                    <p className="text-gray-500 mt-1 flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-dark">{job.company}</span>
                      <span className="text-gray-300">•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={13} />{job.location}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="flex items-center gap-1 text-xs">
                        <Clock size={13} />{timeAgo(job.created_at)}
                      </span>
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className={`tag ${getTagClass(job.type || 'Full-time')}`}>
                        <Briefcase size={10} className="inline mr-1" />{job.type || 'Full-time'}
                      </span>
                      {job.category && (
                        <span className={`tag ${getTagClass(job.category)}`}>
                          <Tag size={10} className="inline mr-1" />{job.category}
                        </span>
                      )}
                      {job.salary && (
                        <span className="tag bg-emerald-50 text-emerald-700">
                          💰 {job.salary}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8">
                <h2 className="text-lg font-bold text-dark mb-4">Job Description</h2>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            </ScrollReveal>

            {/* Requirements */}
            {job.requirements && (
              <ScrollReveal variant="fadeUp" delay={0.15}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8">
                  <h2 className="text-lg font-bold text-dark mb-4">Requirements</h2>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                    {job.requirements}
                  </p>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* ── Right: Apply Form ── */}
          <div className="lg:col-span-1">
            <ScrollReveal variant="fadeRight" delay={0.1}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 sticky top-24">
                <h2 className="text-xl font-bold text-dark mb-1">Apply Now</h2>
                <p className="text-gray-400 text-sm mb-6">
                  Fill in your details to apply for this position
                </p>

                {/* Success state */}
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center text-center py-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-emerald-100 flex items-center 
                                   justify-center mb-4"
                      >
                        <CheckCircle2 size={32} className="text-emerald-600" />
                      </motion.div>
                      <h3 className="font-bold text-dark text-lg mb-1">
                        Application Submitted! 🎉
                      </h3>
                      <p className="text-gray-500 text-sm mb-6">
                        We'll be in touch soon. Good luck!
                      </p>
                      <button
                        onClick={() => setSuccess(false)}
                        className="btn-outline text-sm w-full justify-center"
                      >
                        Apply Again
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                {!success && (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                    {/* Global error */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-600 text-sm 
                                   bg-red-50 p-3 rounded-xl"
                      >
                        <AlertCircle size={15} /> {error}
                      </motion.div>
                    )}

                    {/* Name */}
                    <div>
                      <label className="text-sm font-semibold text-dark mb-1.5 block">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className={`input-field ${fieldErrs.name ? 'border-red-300 focus:ring-red-400' : ''}`}
                      />
                      {fieldErrs.name && (
                        <p className="text-red-500 text-xs mt-1">{fieldErrs.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-sm font-semibold text-dark mb-1.5 block">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className={`input-field ${fieldErrs.email ? 'border-red-300 focus:ring-red-400' : ''}`}
                      />
                      {fieldErrs.email && (
                        <p className="text-red-500 text-xs mt-1">{fieldErrs.email}</p>
                      )}
                    </div>

                    {/* Resume */}
                    <div>
                      <label className="text-sm font-semibold text-dark mb-1.5 block">
                        Resume Link <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={form.resume_link}
                        onChange={e => setForm({ ...form, resume_link: e.target.value })}
                        placeholder="https://drive.google.com/..."
                        className={`input-field ${fieldErrs.resume_link ? 'border-red-300 focus:ring-red-400' : ''}`}
                      />
                      {fieldErrs.resume_link && (
                        <p className="text-red-500 text-xs mt-1">{fieldErrs.resume_link}</p>
                      )}
                    </div>

                    {/* Cover Note */}
                    <div>
                      <label className="text-sm font-semibold text-dark mb-1.5 block">
                        Cover Note
                      </label>
                      <textarea
                        rows={4}
                        value={form.cover_note}
                        onChange={e => setForm({ ...form, cover_note: e.target.value })}
                        placeholder="Tell us why you're a great fit..."
                        className="input-field resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: submitting ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary w-full justify-center text-sm py-3.5 
                                 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Submitting…
                        </>
                      ) : 'Submit Application'}
                    </motion.button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailPage