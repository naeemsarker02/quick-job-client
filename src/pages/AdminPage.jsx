import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, List, PlusCircle, Trash2,
  Users, Eye, Briefcase, TrendingUp, X,
  CheckCircle2, AlertCircle, Loader2, Zap,
  ChevronRight,
} from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/common/ScrollReveal'
import { Spinner } from '../components/common/Loader'
import { jobsApi } from '../services/api'
import { getTagClass, getCompanyColor, CATEGORIES, JOB_TYPES, timeAgo } from '../utils/helpers'

const INIT_JOB = {
  title: '', company: '', location: '', category: '',
  type: 'Full-time', salary: '', description: '', requirements: '',
}

// Must be outside AdminPage to prevent re-mount on every keystroke
const Field = ({ label, required, error, children }) => (
  <div>
    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5 block">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
)

const AdminPage = () => {
  const [tab,         setTab]         = useState('dashboard') // dashboard | jobs | add
  const [jobs,        setJobs]        = useState([])
  const [loading,     setLoading]     = useState(true)
  const [form,        setForm]        = useState(INIT_JOB)
  const [submitting,  setSubmitting]  = useState(false)
  const [deleting,    setDeleting]    = useState(null)
  const [toast,       setToast]       = useState(null) // { type, msg }
  const [fieldErrs,   setFieldErrs]   = useState({})
  const [deleteModal, setDeleteModal] = useState(null) // job to confirm

  const showToast = (type, msg) => {
    setToast({ type, msg })
    setTimeout(() => setToast(null), 3500)
  }

  const fetchJobs = async (signal) => {
    setLoading(true)
    try {
      const res = await jobsApi.getAll({}, signal ? { signal } : {})
      setJobs(res.data.data ?? [])
    } catch (err) {
      if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') setJobs([])
    }
    finally { setLoading(false) }
  }

  useEffect(() => {
    const ac = new AbortController()
    fetchJobs(ac.signal)
    return () => ac.abort()
  }, [])

  const validate = () => {
    const e = {}
    if (!form.title.trim())       e.title       = 'Required'
    if (!form.company.trim())     e.company     = 'Required'
    if (!form.location.trim())    e.location    = 'Required'
    if (!form.category)           e.category    = 'Required'
    if (!form.type)               e.type        = 'Required'
    if (!form.description.trim()) e.description = 'Required'
    return e
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setFieldErrs(errs); return }
    setFieldErrs({})
    setSubmitting(true)
    try {
      await jobsApi.create(form)
      setForm(INIT_JOB)
      await fetchJobs()
      showToast('success', 'Job posted successfully! 🎉')
      setTab('jobs')
    } catch (err) {
      showToast('error', err.response?.data?.message || 'Failed to create job')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    setDeleting(id)
    try {
      await jobsApi.delete(id)
      setJobs(prev => prev.filter(j => j.id !== id))
      showToast('success', 'Job deleted successfully')
    } catch {
      showToast('error', 'Failed to delete job')
    } finally {
      setDeleting(null)
      setDeleteModal(null)
    }
  }

  const stats = [
    { label: 'Total Jobs',      value: jobs.length,                             icon: Briefcase,    color: 'bg-primary-100 text-primary-600' },
    { label: 'Full-Time',       value: jobs.filter(j=>j.type==='Full-time').length,  icon: TrendingUp,   color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Remote',          value: jobs.filter(j=>j.type==='Remote').length,     icon: Users,        color: 'bg-sky-100 text-sky-600'         },
    { label: 'Posted This Week',value: jobs.filter(j => {
        const d = new Date(j.created_at)
        return (Date.now() - d) < 7*86400000
      }).length,                                                                  icon: Eye,          color: 'bg-purple-100 text-purple-600'   },
  ]

  const navItems = [
    { id: 'dashboard', label: 'Dashboard',   icon: LayoutDashboard },
    { id: 'jobs',      label: 'Job Listing', icon: List            },
    { id: 'add',       label: 'Post a Job',  icon: PlusCircle      },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex">

      {/* ── Sidebar ── */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
        className="w-64 bg-dark min-h-screen fixed left-0 top-16 z-40 hidden lg:flex flex-col"
      >
        {/* Brand */}
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Zap size={15} className="text-white" fill="white" />
            </div>
            <span className="font-bold text-white">Quick<span className="text-accent">Hire</span></span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm 
                         font-medium transition-all
                         ${tab === item.id
                           ? 'bg-primary-600 text-white'
                           : 'text-gray-400 hover:bg-white/10 hover:text-white'
                         }`}
            >
              <item.icon size={17} />
              {item.label}
              {tab === item.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-6 py-5 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center 
                            justify-center text-white font-bold text-sm">M</div>
            <div>
              <p className="text-white text-sm font-semibold">Maria Kelly</p>
              <p className="text-gray-500 text-xs">Admin</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile top nav */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-white border-b 
                      border-gray-100 flex overflow-x-auto">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium 
                       whitespace-nowrap border-b-2 transition-colors
                       ${tab === item.id
                         ? 'border-primary-600 text-primary-600'
                         : 'border-transparent text-gray-500'
                       }`}
          >
            <item.icon size={15} /> {item.label}
          </button>
        ))}
      </div>

      {/* ── Main ── */}
      <main className="flex-1 lg:ml-64 pt-12 lg:pt-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Toast */}
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3.5 
                           rounded-2xl shadow-xl text-sm font-medium
                           ${toast.type === 'success'
                             ? 'bg-emerald-600 text-white'
                             : 'bg-red-500 text-white'
                           }`}
              >
                {toast.type === 'success'
                  ? <CheckCircle2 size={17} />
                  : <AlertCircle size={17} />
                }
                {toast.msg}
                <button onClick={() => setToast(null)}>
                  <X size={14} className="opacity-70 hover:opacity-100" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Dashboard Tab ── */}
          {tab === 'dashboard' && (
            <div>
              <ScrollReveal variant="fadeUp">
                <div className="mb-8">
                  <h1 className="text-2xl font-extrabold text-dark">
                    Good morning, <span className="text-primary-600">Maria</span> 👋
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">
                    Here is your job listings overview.
                  </p>
                </div>
              </ScrollReveal>

              {/* Stats */}
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map(s => (
                  <StaggerItem key={s.label}>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
                      <div className={`w-11 h-11 rounded-xl ${s.color} flex items-center 
                                      justify-center mb-3`}>
                        <s.icon size={20} />
                      </div>
                      <p className="text-2xl font-extrabold text-dark">{s.value}</p>
                      <p className="text-gray-500 text-xs mt-1">{s.label}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Recent jobs */}
              <ScrollReveal variant="fadeUp" delay={0.2}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-card">
                  <div className="flex items-center justify-between p-6 border-b border-gray-50">
                    <h2 className="font-bold text-dark">Recent Job Posts</h2>
                    <button
                      onClick={() => setTab('jobs')}
                      className="text-sm text-primary-600 font-semibold hover:text-primary-700"
                    >
                      View All
                    </button>
                  </div>
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <Spinner size="md" />
                    </div>
                  ) : jobs.slice(0,5).map((job, i) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center justify-between px-6 py-4 
                                 border-b border-gray-50 last:border-0 hover:bg-gray-50 
                                 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${getCompanyColor(job.company)} 
                                        flex items-center justify-center text-white 
                                        font-bold text-xs`}>
                          {job.company?.slice(0,2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-dark text-sm">{job.title}</p>
                          <p className="text-gray-400 text-xs">{job.company} · {job.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`tag ${getTagClass(job.type || 'Full-time')}`}>
                          {job.type || 'Full-time'}
                        </span>
                        <span className="text-xs text-gray-400 hidden sm:block">
                          {timeAgo(job.created_at)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  {!loading && jobs.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                      <p className="text-3xl mb-2">📭</p>
                      <p className="text-sm">No jobs posted yet.</p>
                      <button
                        onClick={() => setTab('add')}
                        className="mt-4 btn-primary text-xs py-2 px-4"
                      >
                        Post your first job
                      </button>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* ── Job Listing Tab ── */}
          {tab === 'jobs' && (
            <div>
              <ScrollReveal variant="fadeUp">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-extrabold text-dark">Job Listing</h1>
                    <p className="text-gray-500 text-sm mt-1">
                      {jobs.length} jobs posted
                    </p>
                  </div>
                  <button
                    onClick={() => setTab('add')}
                    className="btn-primary text-sm"
                  >
                    <PlusCircle size={16} /> Post a Job
                  </button>
                </div>
              </ScrollReveal>

              {loading ? (
                <div className="flex items-center justify-center py-24">
                  <Spinner size="lg" />
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
                  <p className="text-4xl mb-3">📭</p>
                  <p className="font-semibold text-dark mb-1">No jobs yet</p>
                  <p className="text-gray-400 text-sm mb-5">Post your first job listing</p>
                  <button onClick={() => setTab('add')} className="btn-primary text-sm">
                    <PlusCircle size={15} /> Post a Job
                  </button>
                </div>
              ) : (
                <StaggerContainer className="space-y-3">
                  {jobs.map(job => (
                    <StaggerItem key={job.id}>
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-card 
                                      p-5 flex items-center gap-4 hover:border-primary-100 
                                      transition-colors">
                        <div className={`w-12 h-12 rounded-xl ${getCompanyColor(job.company)} 
                                        flex items-center justify-center text-white 
                                        font-bold text-sm flex-shrink-0`}>
                          {job.company?.slice(0,2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-dark text-sm truncate">{job.title}</p>
                          <p className="text-gray-400 text-xs mt-0.5">
                            {job.company} · {job.location} · {timeAgo(job.created_at)}
                          </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                          <span className={`tag ${getTagClass(job.type || 'Full-time')}`}>
                            {job.type}
                          </span>
                          {job.category && (
                            <span className={`tag ${getTagClass(job.category)}`}>
                              {job.category}
                            </span>
                          )}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setDeleteModal(job)}
                          disabled={deleting === job.id}
                          className="w-9 h-9 rounded-xl bg-red-50 text-red-500 
                                     flex items-center justify-center hover:bg-red-100 
                                     transition-colors flex-shrink-0 disabled:opacity-50"
                        >
                          {deleting === job.id
                            ? <Loader2 size={15} className="animate-spin" />
                            : <Trash2 size={15} />
                          }
                        </motion.button>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </div>
          )}

          {/* ── Add Job Tab ── */}
          {tab === 'add' && (
            <div>
              <ScrollReveal variant="fadeUp">
                <div className="mb-6">
                  <h1 className="text-2xl font-extrabold text-dark">Post a New Job</h1>
                  <p className="text-gray-500 text-sm mt-1">Fill in the details below</p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fadeUp" delay={0.1}>
                <form onSubmit={handleCreate} noValidate>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 space-y-5">

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Job Title" required error={fieldErrs.title}>
                        <input
                          value={form.title}
                          onChange={e => setForm({...form, title: e.target.value})}
                          placeholder="e.g. Senior Frontend Developer"
                          className={`input-field ${fieldErrs.title ? 'border-red-300' : ''}`}
                        />
                      </Field>
                      <Field label="Company Name" required error={fieldErrs.company}>
                        <input
                          value={form.company}
                          onChange={e => setForm({...form, company: e.target.value})}
                          placeholder="e.g. Acme Corp"
                          className={`input-field ${fieldErrs.company ? 'border-red-300' : ''}`}
                        />
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Location" required error={fieldErrs.location}>
                        <input
                          value={form.location}
                          onChange={e => setForm({...form, location: e.target.value})}
                          placeholder="e.g. Dhaka, Bangladesh"
                          className={`input-field ${fieldErrs.location ? 'border-red-300' : ''}`}
                        />
                      </Field>
                      <Field label="Salary Range" error={fieldErrs.salary}>
                        <input
                          value={form.salary}
                          onChange={e => setForm({...form, salary: e.target.value})}
                          placeholder="e.g. 50k-80k BDT"
                          className="input-field"
                        />
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Category" required error={fieldErrs.category}>
                        <select
                          value={form.category}
                          onChange={e => setForm({...form, category: e.target.value})}
                          className={`input-field ${fieldErrs.category ? 'border-red-300' : ''}`}
                        >
                          <option value="">Select category</option>
                          {CATEGORIES.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Job Type" required error={fieldErrs.type}>
                        <select
                          value={form.type}
                          onChange={e => setForm({...form, type: e.target.value})}
                          className="input-field"
                        >
                          {JOB_TYPES.map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field label="Job Description" required error={fieldErrs.description}>
                      <textarea
                        rows={5}
                        value={form.description}
                        onChange={e => setForm({...form, description: e.target.value})}
                        placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                        className={`input-field resize-none ${fieldErrs.description ? 'border-red-300' : ''}`}
                      />
                    </Field>

                    <Field label="Requirements">
                      <textarea
                        rows={4}
                        value={form.requirements}
                        onChange={e => setForm({...form, requirements: e.target.value})}
                        placeholder="Skills, experience, and qualifications needed..."
                        className="input-field resize-none"
                      />
                    </Field>

                    <div className="flex gap-3 pt-2">
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{ scale: submitting ? 1 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary flex-1 justify-center disabled:opacity-60 
                                   disabled:cursor-not-allowed"
                      >
                        {submitting
                          ? <><Loader2 size={16} className="animate-spin" /> Posting…</>
                          : <><PlusCircle size={16} /> Post Job</>
                        }
                      </motion.button>
                      <button
                        type="button"
                        onClick={() => { setForm(INIT_JOB); setFieldErrs({}) }}
                        className="btn-outline"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </form>
              </ScrollReveal>
            </div>
          )}
        </div>
      </main>

      {/* ── Delete Confirm Modal ── */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 
                       flex items-center justify-center p-4"
            onClick={() => setDeleteModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center 
                              justify-center mx-auto mb-4">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <h3 className="font-bold text-dark text-lg mb-2">Delete Job?</h3>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to delete{' '}
                <strong className="text-dark">"{deleteModal.title}"</strong>?
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal(null)}
                  className="flex-1 btn-outline justify-center"
                >
                  Cancel
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleDelete(deleteModal.id)}
                  disabled={deleting === deleteModal.id}
                  className="flex-1 bg-red-500 text-white font-semibold py-3 px-4 
                             rounded-xl hover:bg-red-600 transition-colors flex items-center 
                             justify-center gap-2 disabled:opacity-60"
                >
                  {deleting === deleteModal.id
                    ? <Loader2 size={16} className="animate-spin" />
                    : <Trash2 size={16} />
                  }
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminPage