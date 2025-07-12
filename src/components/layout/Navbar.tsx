'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { logout } from '@/store/slices/authSlice'
import { useLogoutMutation } from '@/store/api/authApi'
import { Button } from '@/components/ui/Button'
import { Menu, X, User, LogOut, FileText, Home, Settings, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import toast from 'react-hot-toast'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const [logoutMutation] = useLogoutMutation()
  const { theme, setTheme } = useTheme()

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap()
      dispatch(logout())
      toast.success('Logged out successfully')
    } catch (error) {
      // Even if the API call fails, we should still log out the user locally
      dispatch(logout())
      toast.success('Logged out successfully')
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold gradient-text"
            >
              Resumo
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                  <Home className="w-5 h-5 inline mr-1" />
                  Dashboard
                </Link>
                <Link href="/resume/create" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                  <FileText className="w-5 h-5 inline mr-1" />
                  Create Resume
                </Link>
                <Link href="/templates" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                  Templates
                </Link>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleTheme}
                    className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                  >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                  <span className="text-gray-700 dark:text-gray-300">
                    <User className="w-5 h-5 inline mr-1" />
                    {user?.name}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <Link href="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-4 space-y-4">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Home className="w-5 h-5 inline mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    href="/resume/create"
                    className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText className="w-5 h-5 inline mr-2" />
                    Create Resume
                  </Link>
                  <Link
                    href="/templates"
                    className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Templates
                  </Link>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      <User className="w-5 h-5 inline mr-2" />
                      {user?.name}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="w-full"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">Login</Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}