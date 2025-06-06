import { baseApi } from './baseApi'

export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  address: string
  resumeId?: string
}

export interface Education {
  school: string
  degree: string
  startDate: string
  endDate: string
}

export interface Experience {
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

export interface Resume {
  _id?: string
  title: string
  personalInfo?: any
  education?: Education[]
  experience?: Experience[]
  skills?: string[]
  template?: string
}

export const resumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Resume endpoints
    createResume: builder.mutation<any, { title: string }>({
      query: (data) => ({
        url: '/resume',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Resume'],
    }),
    getMyResumes: builder.query<any, void>({
      query: () => '/resume/my',
      providesTags: ['Resume'],
    }),
    getResumeById: builder.query<any, string>({
      query: (id) => `/resume/${id}`,
      providesTags: ['Resume'],
    }),
    updateResume: builder.mutation<any, { resumeId: string; data: Partial<Resume> }>({
      query: ({ resumeId, data }) => ({
        url: `/resume/${resumeId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Resume'],
    }),
    deleteResume: builder.mutation<any, string>({
      query: (id) => ({
        url: `/resume/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Resume'],
    }),

    // Personal Info endpoints
    createPersonalInfo: builder.mutation<any, PersonalInfo>({
      query: (data) => ({
        url: '/personal-info',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PersonalInfo'],
    }),

    // Education endpoints
    createEducation: builder.mutation<any, Education[]>({
      query: (data) => ({
        url: '/education',
        method: 'POST',
        body: { education: data },
      }),
      invalidatesTags: ['Education'],
    }),

    // Experience endpoints
    createExperience: builder.mutation<any, Experience[]>({
      query: (data) => ({
        url: '/experience',
        method: 'POST',
        body: { experience: data },
      }),
      invalidatesTags: ['Experience'],
    }),

    // Send email endpoint
    sendResumeEmail: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/send-email',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
})

export const {
  useCreateResumeMutation,
  useGetMyResumesQuery,
  useGetResumeByIdQuery,
  useUpdateResumeMutation,
  useDeleteResumeMutation,
  useCreatePersonalInfoMutation,
  useCreateEducationMutation,
  useCreateExperienceMutation,
  useSendResumeEmailMutation,
} = resumeApi