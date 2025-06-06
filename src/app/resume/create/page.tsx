'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { RootState } from '@/store/store'
import { useCreateResumeMutation } from '@/store/api/resumeApi'
import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'

const schema = yup.object({
  title: yup.string().required('Title is required'),
})

type CreateResumeFormData = yup.InferType<typeof schema>

export default function CreateResumePage() {
  useAuth()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const router = useRouter()
  const [createResume, { isLoading }] = useCreateResumeMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateResumeFormData>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, router])

  const onSubmit = async (data: CreateResumeFormData) => {
    try {
      const result = await createResume(data).unwrap()
      
      if (result.success) {
        toast.success('Resume created successfully!')
        router.push(`/resume/builder/${result.data._id}`)
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create resume')
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <Link
            href="/dashboard"
            className="inline-flex items-center text-primary-500 hover:text-primary-600 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>

          <Card>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create New Resume
              </h1>
              <p className="text-gray-600">
                Give your resume a title to get started
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Resume Title"
                type="text"
                placeholder="e.g., Software Engineer Resume, Marketing Manager CV"
                error={errors.title?.message}
                {...register('title')}
              />

              <div className="flex space-x-4">
                <Link href="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  loading={isLoading}
                  className="flex-1"
                >
                  Create Resume
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}