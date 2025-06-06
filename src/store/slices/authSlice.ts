import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

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
      
      // Store tokens in cookies
      Cookies.set('accessToken', accessToken, { expires: 1 })
      Cookies.set('refreshToken', refreshToken, { expires: 7 })
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      
      // Remove tokens from cookies
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
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
      
      // Update cookies
      Cookies.set('accessToken', accessToken, { expires: 1 })
      Cookies.set('refreshToken', refreshToken, { expires: 7 })
    },
  },
})

export const { setCredentials, logout, updateTokens } = authSlice.actions
export default authSlice.reducer