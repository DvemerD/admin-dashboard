import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}admin/`
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: '/token/',
        method: 'POST',
        body: payload
      })
    })
  })
});

export const { useLoginMutation } = authApi;