'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { setCredentials } from '@/store/slices/authSlice'
import { useLoginMutation } from '@/store/api/authApi'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [login, { isLoading }] = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data).unwrap()
      
      if (result.success) {
        // Extract user and tokens from the response
        const { user, accessToken, refreshToken } = result.data
        
        dispatch(setCredentials({
          user,
          accessToken,
          refreshToken,
        }))
        
        toast.success('Login successful!')
        router.push('/dashboard')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      toast.error(error?.data?.message || 'Login failed')
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
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <p className="text-muted-foreground">Sign in to your account</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                {...register('email')}
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  error={errors.password?.message}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                loading={isLoading}
                className="w-full"
                size="lg"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}