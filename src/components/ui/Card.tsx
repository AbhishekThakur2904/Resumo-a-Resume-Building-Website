'use client'

import { ReactNode, HTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ 
  children, 
  className, 
  hover = false, 
  ...props 
}, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn('card', className)}
      whileHover={hover ? { y: -2, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
})

Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ 
  className, 
  ...props 
}, ref) => (
  <div ref={ref} className={cn('card-header', className)} {...props} />
))

CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(({ 
  className, 
  ...props 
}, ref) => (
  <h3 ref={ref} className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
))

CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({ 
  className, 
  ...props 
}, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))

CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ 
  className, 
  ...props 
}, ref) => (
  <div ref={ref} className={cn('card-content', className)} {...props} />
))

CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ 
  className, 
  ...props 
}, ref) => (
  <div ref={ref} className={cn('card-footer', className)} {...props} />
))

CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }