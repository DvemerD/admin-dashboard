import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './query/baseQuery';

export const ratesApi = createApi({
  reducerPath: 'ratesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Rates'],
  endpoints: (builder) => ({
    addRate: builder.mutation({
      query: (data) => ({
        url: 'rate/create/',
        method: 'POST',
        body: data,
        peovidesTags: ['Rates']
      })
    })
  })
});

export const { useAddRateMutation } = ratesApi;