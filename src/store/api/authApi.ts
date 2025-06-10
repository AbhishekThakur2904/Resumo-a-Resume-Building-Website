import { baseApi } from './baseApi'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  role: 'USER' | 'ADMIN'
}

export interface ForgotPasswordRequest {
  email: string
}

export interface UpdatePasswordRequest {
  token: string
  password: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginRequest>({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
        credentials: 'include', // Include cookies
      }),
    }),
    register: builder.mutation<any, RegisterRequest>({
      query: (userData) => ({
        url: '/users/register',
        method: 'POST',
        body: userData,
        credentials: 'include',
      }),
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: '/users/logout',
        method: 'PATCH',
        credentials: 'include', // Include cookies for logout
      }),
    }),
    forgotPassword: builder.mutation<any, ForgotPasswordRequest>({
      query: (data) => ({
        url: '/users/forgot-password',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    updatePassword: builder.mutation<any, UpdatePasswordRequest>({
      query: (data) => ({
        url: '/users/update-password',
        method: 'PATCH',
        body: data,
        credentials: 'include',
      }),
    }),
    refreshToken: builder.mutation<any, void>({
      query: () => ({
        url: '/users/refresh',
        method: 'GET',
        credentials: 'include', // Include cookies for refresh
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useUpdatePasswordMutation,
  useRefreshTokenMutation,
} = authApi