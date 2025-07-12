'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/store/store'
import { useGetMyResumesQuery, useDeleteResumeMutation } from '@/store/api/resumeApi'
import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Plus, FileText, Trash2, Eye, Calendar, Edit, Download } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'
import { formatDate } from '@/lib/utils'

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
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600">
                Manage your resumes and create new ones
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link href="/resume/create">
                <Button size="lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Resume
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-primary mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Resumes</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {resumesData?.data?.length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Download className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Downloads</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Views</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resumes Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Resumes</h2>
            {resumesData?.data?.length > 0 && (
              <Link href="/resume/create">
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New
                </Button>
              </Link>
            )}
          </div>
          
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
                  <Card hover className="relative group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <FileText className="w-8 h-8 text-primary mr-3" />
                          <div>
                            <CardTitle className="text-lg truncate">
                              {resume.title}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {resume.personalInfo?.fullName || 'No name set'}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteResume(resume._id)}
                          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      {/* Skills Preview */}
                      {resume.skills && resume.skills.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {resume.skills.slice(0, 3).map((skill: string, skillIndex: number) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                            {resume.skills.length > 3 && (
                              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                +{resume.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Education Preview */}
                      {resume.education && resume.education.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground">
                            {resume.education[0].degree} at {resume.education[0].school}
                          </p>
                        </div>
                      )}

                      {/* Created Date */}
                      <div className="flex items-center text-xs text-muted-foreground mb-4">
                        <Calendar className="w-4 h-4 mr-1" />
                        Created {formatDate(resume.createdAt)}
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
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No resumes yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Create your first resume to get started
                </p>
                <Link href="/resume/create">
                  <Button>
                    <Plus className="w-5 h-5 mr-2" />
                    Create Resume
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}