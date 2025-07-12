'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useRegisterMutation } from '@/store/api/authApi'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [register, { isLoading }] = useRegisterMutation()

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'USER',
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await register(data).unwrap()
      
      if (result.success) {
        toast.success('Registration successful! Please login.')
        router.push('/auth/login')
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <Link href="/" className="text-2xl font-bold gradient-text mb-4 block">
              Resumo
            </Link>
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <p className="text-muted-foreground">Join Resumo and start building your resume</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                error={errors.name?.message}
                {...registerField('name')}
              />

              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                {...registerField('email')}
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  error={errors.password?.message}
                  {...registerField('password')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div>
                <label className="form-label mb-2 block">
                  Role
                </label>
                <select
                  className="select w-full"
                  {...registerField('role')}
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
                {errors.role && <p className="form-error mt-1">{errors.role.message}</p>}
              </div>

              <Button
                type="submit"
                loading={isLoading}
                className="w-full"
                size="lg"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}