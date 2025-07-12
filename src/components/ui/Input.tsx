'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="form-label mb-2 block">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'input',
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          {...props}
        />
        {error && <p className="form-error mt-1">{error}</p>}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground mt-1">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }