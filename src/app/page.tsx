'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '@/store/store'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { FileText, Users, Zap, Shield, Star, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function HomePage() {
  useAuth()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  const features = [
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: 'Professional Templates',
      description: 'Choose from a variety of modern, ATS-friendly resume templates designed by professionals'
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'Easy to Use',
      description: 'Intuitive step-by-step process to build your perfect resume in minutes, not hours'
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: 'Quick Export',
      description: 'Download as PDF, send directly via email, or share with a public link'
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: 'Secure & Private',
      description: 'Your data is encrypted and stored securely. We never share your information'
    }
  ]

  const benefits = [
    'ATS-optimized templates',
    'Real-time preview',
    'Multiple export formats',
    'Cover letter builder',
    'Professional templates',
    'Secure cloud storage'
  ]

  if (isAuthenticated) {
    return null // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold gradient-text">
                Resumo
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-1 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4" />
                  <span>Trusted by 10,000+ professionals</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Build Your Perfect
                <span className="gradient-text block">Resume</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Create professional resumes and cover letters that get you hired. 
                Our modern templates and AI-powered suggestions make it simple.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/auth/register">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                    Start Building Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                    View Templates
                  </Button>
                </Link>
              </div>

              {/* Benefits List */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {benefit}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Resumo?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create a standout resume that gets results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full p-8 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex justify-center mb-6">
                    <div className="p-3 bg-primary/10 rounded-full">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
              <div className="text-xl opacity-90">Resumes Created</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-xl opacity-90">Success Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-xl opacity-90">Support Available</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Build Your Resume?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join thousands of professionals who have landed their dream jobs
            </p>
            <Link href="/auth/register">
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-lg px-8 py-4 bg-white text-primary hover:bg-gray-100"
              >
                Start Building Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="text-2xl font-bold mb-4 block">
                Resumo
              </Link>
              <p className="text-gray-400 mb-4 max-w-md">
                Professional resume builder that helps you create stunning resumes 
                and cover letters that get you hired.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Resumo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}