'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAuth } from '@/store/slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Initialize auth state from localStorage on app start
    dispatch(initializeAuth())
  }, [dispatch])
}