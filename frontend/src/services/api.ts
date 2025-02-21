import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authSlice } from "../redux/reducer/authSlice";
interface IToken {
  data: { accessToken: string; refreshToken: string };
}

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const token = localStorage.getItem("accessToken");

  const enhancedArgs = {
    ...args,
    headers: {
      ...(args.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  let result = await baseQuery(enhancedArgs, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("Token expired. Attempting to refresh...");

    const refreshResult = await baseQuery(
      {
        url: "/users/refresh",
        method: "GET",
        credentials: "include",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      console.log("Token refreshed successfully.");

      const newToken = refreshResult.data as IToken;
      console.log(newToken);
      api.dispatch(authSlice.actions.setTokens(newToken?.data));

      const retryArgs = {
        ...args,
        headers: {
          ...(args.headers || {}),
          Authorization: `Bearer ${newToken?.data?.accessToken}`,
        },
      };

      result = await baseQuery(retryArgs, api, extraOptions);
    } else {
      console.error("Token refresh failed. Logging out...");
      api.dispatch(authSlice.actions.resetTokens());
    }
  }

  return result;
};
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    //user
    registerUser: builder.mutation({
      query: (formData) => ({
        url: "/users/register",
        method: "POST",
        body: formData,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "PATCH",
        credentials: "include",
      }),
    }),
    forgot: builder.mutation({
      query: (email) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: email,
      }),
    }),

    update: builder.mutation({
      query: (data) => ({
        url: "/users/update-password",
        method: "PATCH",
        body: data,
      }),
    }),

    //resume
    createResume: builder.mutation({
      query: (data) => ({
        url: "/resume/",
        method: "POST",
        body: data,
      }),
    }),
    deleteResume: builder.mutation({
      query: (resumeId) => ({
        url: `/resume/${resumeId}`,
        method: "DELETE",
      }),
    }),
    updateResume: builder.mutation({
      query: ({ data, resumeId }) => ({
        url: `/resume/${resumeId}`,
        method: "PATCH",
        body: data,
      }),
    }),

    myResume: builder.query({
      query: () => ({
        url: "/resume/my",
        credentials: "include",
      }),
    }),

    getResumeById: builder.query({
      query: (id) => ({
        url: `/resume/${id}`,
      }),
    }),

    createPersonalInfo: builder.mutation({
      query: (data) => ({
        url: "/personal-info/",
        method: "POST",
        body: data,
      }),
    }),
    createEducationalInfo: builder.mutation({
      query: (data) => ({
        url: "/education/",
        method: "POST",
        body: data,
      }),
    }),
    createExperience: builder.mutation({
      query: (data) => ({
        url: "/experience/",
        method: "POST",
        body: data,
      }),
    }),
    sendFile: builder.mutation({
      query: (data: FormData) => ({
        url: "/send-email",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotMutation,
  useUpdateMutation,
  useMyResumeQuery,
  useGetResumeByIdQuery,
  useCreateResumeMutation,
  useCreatePersonalInfoMutation,
  useUpdateResumeMutation,
  useCreateEducationalInfoMutation,
  useCreateExperienceMutation,
  useSendFileMutation,
  useDeleteResumeMutation,
} = apiSlice;
