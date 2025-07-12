import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { updateTokens, logout } from '../slices/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  credentials: 'include', // This is crucial for cookies
  prepareHeaders: (headers, { getState }) => {
    // Don't manually set Authorization header since we're using cookies
    // The backend will read the accessToken from cookies
    headers.set('Content-Type', 'application/json')
    return headers
  },
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    // Try to refresh the token using the refresh endpoint
    const refreshResult = await baseQuery(
      {
        url: '/users/refresh',
        method: 'GET',
        credentials: 'include', // Include cookies for refresh token
      },
      api,
      extraOptions
    )

    if (refreshResult?.data) {
      const refreshData = refreshResult.data as any
      if (refreshData.success) {
        // Update tokens in Redux store
        api.dispatch(updateTokens({
          accessToken: refreshData.data.accessToken,
          refreshToken: refreshData.data.refreshToken,
        }))

        // Retry the original query
        result = await baseQuery(args, api, extraOptions)
      } else {
        api.dispatch(logout())
      }
    } else {
      api.dispatch(logout())
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Resume', 'PersonalInfo', 'Education', 'Experience', 'CoverLetter'],
  endpoints: () => ({}),
})