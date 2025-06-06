'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/store/store'
import { useGetMyResumesQuery, useDeleteResumeMutation } from '@/store/api/resumeApi'
import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Plus, FileText, Trash2, Eye, Calendar } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  useAuth()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const router = useRouter()
  const { data: resumesData, isLoading, refetch } = useGetMyResumesQuery()
  const [deleteResume] = useDeleteResumeMutation()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, router])

  const handleDeleteResume = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await deleteResume(id).unwrap()
        toast.success('Resume deleted successfully')
        refetch()
      } catch (error) {
        toast.error('Failed to delete resume')
      }
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Manage your resumes and create new ones
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Link href="/resume/create">
            <Button size="lg" className="mb-4">
              <Plus className="w-5 h-5 mr-2" />
              Create New Resume
            </Button>
          </Link>
        </motion.div>

        {/* Resumes Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Resumes</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : resumesData?.data?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumesData.data.map((resume: any, index: number) => (
                <motion.div
                  key={resume._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card hover className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <FileText className="w-8 h-8 text-primary-500 mr-3" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {resume.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {resume.personalInfo?.fullName || 'No name set'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteResume(resume._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Skills Preview */}
                    {resume.skills && resume.skills.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {resume.skills.slice(0, 3).map((skill: string, skillIndex: number) => (
                            <span
                              key={skillIndex}
                              className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                          {resume.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{resume.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Education Preview */}
                    {resume.education && resume.education.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">
                          {resume.education[0].degree} at {resume.education[0].school}
                        </p>
                      </div>
                    )}

                    {/* Created Date */}
                    <div className="flex items-center text-xs text-gray-500 mb-4">
                      <Calendar className="w-4 h-4 mr-1" />
                      Created {new Date(resume.createdAt).toLocaleDateString()}
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Link href={`/resume/${resume._id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Link href={`/resume/edit/${resume._id}`} className="flex-1">
                        <Button size="sm" className="w-full">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No resumes yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first resume to get started
              </p>
              <Link href="/resume/create">
                <Button>
                  <Plus className="w-5 h-5 mr-2" />
                  Create Resume
                </Button>
              </Link>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}