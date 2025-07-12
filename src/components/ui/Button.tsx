'use client'

import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { LoadingSpinner } from './LoadingSpinner'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
  children: ReactNode
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className,
  disabled,
  asChild = false,
  ...props
}, ref) => {
  const baseClasses = 'btn'
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
  }
  
  const sizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
    icon: 'h-10 w-10'
  }

  const isDisabled = disabled || loading

  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  if (asChild) {
    return (
      <motion.div
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        className={buttonClasses}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.button
      ref={ref}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      className={buttonClasses}
      disabled={isDisabled}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </motion.button>
  )
})

Button.displayName = 'Button'

export { Button }