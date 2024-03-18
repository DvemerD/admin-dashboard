import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './query/baseQuery';

export const ratesApi = createApi({
  reducerPath: 'ratesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Rates'],
  endpoints: (builder) => ({
    getRates: builder.query({
      query: () => 'rate/',
      providesTags: ['Rates']
    }),
    createRate: builder.mutation({
      query: (data) => ({
        url: 'rate/create/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Rates']
    }),
    deleteRate: builder.mutation({
      query: (id) => ({
        url: `rate/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rates']
    }),
    putRate: builder.mutation({
      query: ({id, data}) => ({
        url: `rate/${id}/`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Rates']
    })
  })
});

export const {
  useGetRatesQuery,
  useCreateRateMutation,
  useDeleteRateMutation,
  usePutRateMutation } = ratesApi;