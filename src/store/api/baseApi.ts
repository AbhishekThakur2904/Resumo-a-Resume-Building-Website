import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { updateTokens, logout } from '../slices/authSlice'
import Cookies from 'js-cookie'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = Cookies.get('accessToken')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    // Try to get a new token
    const refreshToken = Cookies.get('refreshToken')
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/users/refresh',
          method: 'GET',
          headers: {
            authorization: `Bearer ${refreshToken}`,
          },
        },
        api,
        extraOptions
      )

      if (refreshResult?.data) {
        const { accessToken, refreshToken: newRefreshToken } = (refreshResult.data as any).data
        
        // Store the new tokens
        api.dispatch(updateTokens({
          accessToken,
          refreshToken: newRefreshToken,
        }))

        // Retry the original query with new token
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
  tagTypes: ['User', 'Resume', 'PersonalInfo', 'Education', 'Experience'],
  endpoints: () => ({}),
})