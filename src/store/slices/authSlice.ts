import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  _id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN'
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User
        accessToken: string
        refreshToken: string
      }>
    ) => {
      const { user, accessToken, refreshToken } = action.payload
      state.user = user
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.isAuthenticated = true
      
      // Store user data in localStorage for persistence across page reloads
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('isAuthenticated', 'true')
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      
      // Clear localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
    },
    updateTokens: (
      state,
      action: PayloadAction<{
        accessToken: string
        refreshToken: string
      }>
    ) => {
      const { accessToken, refreshToken } = action.payload
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      // Keep user authenticated
      state.isAuthenticated = true
    },
    // Initialize auth state from localStorage
    initializeAuth: (state) => {
      const userData = localStorage.getItem('user')
      const isAuthenticated = localStorage.getItem('isAuthenticated')
      
      if (userData && isAuthenticated === 'true') {
        try {
          state.user = JSON.parse(userData)
          state.isAuthenticated = true
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error)
          // Clear corrupted data
          localStorage.removeItem('user')
          localStorage.removeItem('isAuthenticated')
        }
      }
    },
  },
})

export const { setCredentials, logout, updateTokens, initializeAuth } = authSlice.actions
export default authSlice.reducer