import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getTagClass, getCompanyColor, timeAgo } from '../../utils/helpers'

// ── Featured / Grid card  
const JobCard = ({ job, variant = 'default' }) => {
    const initials = job.company?.slice(0, 2).toUpperCase() || 'JB'
    const bgColor = getCompanyColor(job.company || '')

    // ── List variant (Latest jobs section)
    if (variant === 'list') {
        return (
            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Link
                    to={`/jobs/${job.id}`}
                    className="flex flex-col gap-2 px-6 py-4 rounded-2xl border border-gray-100
                     bg-white hover:border-primary-200 hover:shadow-card
                     transition-all duration-300 group"
                >
                    <div className="flex-1 min-w-0 bg-gray-50 rounded-lg p-3
                border border-gray-100
                group-hover:bg-white group-hover:shadow-sm
                transition-all duration-200">

                        <p className="font-semibold text-dark text-sm
                group-hover:text-primary-600
                transition-colors truncate">
                            {job.title}
                        </p>

                        <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                            {job.company}
                            <span className="text-gray-300">•</span>
                            <MapPin size={10} />
                            {job.location}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className={`tag ${getTagClass(job.type || 'Full-time')}`}>
                                {job.type || 'Full-time'}
                            </span>

                            {job.category && (
                                <span className={`tag ${getTagClass(job.category)}`}>
                                    {job.category}
                                </span>
                            )}
                        </div>
                    </div>
                </Link>
            </motion.div>
        )
    }

    // ── Default / Featured card  
    return (
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
            <Link
                to={`/jobs/${job.id}`}
                className="flex flex-col gap-0 bg-white rounded-xl border border-gray-200
                   hover:border-primary-300 hover:shadow-card-hover
                   transition-all duration-300 group overflow-hidden block"
            >
                {/* Top row: logo + Full Time tag */}
                <div className="flex items-start justify-between p-5 pb-3">
                    {/* Company logo circle */}
                    <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center
                          text-white font-bold text-sm flex-shrink-0`}>
                        {initials}
                    </div>

                    {/* "Full Time" outlined tag — top right */}
                    <span className="text-xs font-semibold text-primary-600 border border-primary-400
                           px-3 py-1 rounded-sm">
                        {job.type || 'Full Time'}
                    </span>
                </div>

                {/* Job title + company + location */}
                <div className="px-5 pb-3">
                    <h3 className="font-bold text-dark text-base leading-snug
                         group-hover:text-primary-600 transition-colors">
                        {job.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 flex items-center gap-1.5">
                        {job.company}
                        <span className="text-gray-300">•</span>
                        {job.location}
                    </p>
                </div>

                {/* Description */}
                {job.description && (
                    <div className="px-5 pb-3">
                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                            {job.company} is looking for {job.title} to {job.description.slice(0, 60)}...
                        </p>
                    </div>
                )}

                {/* Bottom: category tags */}
                <div className="px-5 pb-5 pt-1 flex flex-wrap gap-2 mt-auto">
                    {job.category && (
                        <span className={`tag ${getTagClass(job.category)}`}>{job.category}</span>
                    )}
                    {job.type && job.type !== 'Full-time' && (
                        <span className={`tag ${getTagClass(job.type)}`}>{job.type}</span>
                    )}
                </div>
            </Link>
        </motion.div>
    )
}

export default JobCard