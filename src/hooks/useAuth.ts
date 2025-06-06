'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@/store/slices/authSlice'
import Cookies from 'js-cookie'

export const useAuth = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')
    const userData = localStorage.getItem('user')

    if (accessToken && refreshToken && userData) {
      try {
        const user = JSON.parse(userData)
        dispatch(setCredentials({
          user,
          accessToken,
          refreshToken,
        }))
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
  }, [dispatch])
}