import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './query/baseQuery';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: baseQueryWithReauth(`${import.meta.env.VITE_SERVER_URL}site/`),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => 'coments/',
      providesTags: ['Comments']
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: 'coments/create/',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Comments']
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `coments/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Comments']
    }),
  })
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation
} = commentsApi;