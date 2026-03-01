// ─── Tag color map ────────────────────────────────────
export const getTagClass = (tag = '') => {
    const map = {
      marketing:   'tag-marketing',
      design:      'tag-design',
      technology:  'tag-technology',
      business:    'tag-business',
      engineering: 'tag-engineering',
      finance:     'tag-finance',
      'full-time': 'tag-fulltime',
      'full time': 'tag-fulltime',
      remote:      'tag-remote',
      'part-time': 'tag-parttime',
      'part time': 'tag-parttime',
    }
    return map[tag.toLowerCase()] ?? 'bg-gray-100 text-gray-600'
  }
  
  // ─── Category icon emoji map ──────────────────────────
  export const categoryIcon = {
    Design:          '🎨',
    Sales:           '📈',
    Marketing:       '📣',
    Finance:         '💰',
    Technology:      '💻',
    Engineering:     '⚙️',
    Business:        '💼',
    'Human Resource':'👥',
  }
  
  // ─── Date formatter ───────────────────────────────────
  export const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const days = Math.floor(diff / 86400000)
    if (days === 0) return 'Today'
    if (days === 1) return '1 day ago'
    if (days < 30)  return `${days} days ago`
    const months = Math.floor(days / 30)
    return months === 1 ? '1 month ago' : `${months} months ago`
  }
  
  // ─── Company logo placeholder color ──────────────────
  export const getCompanyColor = (name = '') => {
    const colors = [
      'bg-blue-500','bg-indigo-500','bg-purple-500','bg-pink-500',
      'bg-orange-500','bg-teal-500','bg-emerald-500','bg-cyan-500',
    ]
    let sum = 0
    for (const c of name) sum += c.charCodeAt(0)
    return colors[sum % colors.length]
  }
  
  // ─── Categories list ──────────────────────────────────
  export const CATEGORIES = [
    'Design','Sales','Marketing','Finance',
    'Technology','Engineering','Business','Human Resource',
  ]
  
  export const JOB_TYPES = ['Full-time','Part-time','Remote','Internship','Contract']