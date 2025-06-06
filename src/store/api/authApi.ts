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
      }),
    }),
    register: builder.mutation<any, RegisterRequest>({
      query: (userData) => ({
        url: '/users/register',
        method: 'POST',
        body: userData,
      }),
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: '/users/logout',
        method: 'PATCH',
      }),
    }),
    forgotPassword: builder.mutation<any, ForgotPasswordRequest>({
      query: (data) => ({
        url: '/users/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    updatePassword: builder.mutation<any, UpdatePasswordRequest>({
      query: (data) => ({
        url: '/users/update-password',
        method: 'PATCH',
        body: data,
      }),
    }),
    refreshToken: builder.mutation<any, void>({
      query: () => ({
        url: '/users/refresh',
        method: 'GET',
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